import {
  AbstractBaseTypeConfig,
  BaseReturnConfigs,
  BaseTypeConfigs,
  IfExtendsArrayThenWrap,
} from "../../types";
import { BaseReturnConfig } from "../traverserTypes";

// TypeConfig
export interface BaseInterfaceTypeConfig<
  OriginalType,
  TypeKeys extends string | number | Symbol
> extends AbstractBaseTypeConfig<OriginalType> {
  kind: "interface";
  properties: Partial<
    {
      [Property in keyof OriginalType]: TypeKeys;
    }
  >;
}

// ReturnConfig
export type BaseInterfaceReturnConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseInterfaceTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? {
      returnType: any;
      propertyReturnTypes: {
        [Property in keyof TypeConfigs[TypeKey]["properties"]]: any;
      };
    }
  : never;

// DefaultReturnConfig
export type DefaultInterfaceReturnConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseInterfaceTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? {
      returnType: OriginalType;
      propertyReturnTypes: {
        [Property in keyof TypeConfigs[TypeKey]["properties"]]: TypeConfigs[TypeKey]["properties"][Property] extends keyof TypeConfigs
          ? IfExtendsArrayThenWrap<
              OriginalType[Property],
              TypeConfigs[TypeConfigs[TypeKey]["properties"][Property]]["type"]
            >
          : never;
      };
    }
  : never;

// TraverserConfig
export type InterfaceTraverserConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseInterfaceTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? {
      kind: "interface";
      properties: {
        [PropertyKey in keyof TypeConfigs[TypeKey]["properties"]]: TypeConfigs[TypeKey]["properties"][PropertyKey];
      };
    }
  : never;

// Transformer Config
export type InterfaceTransformerConfig<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseInterfaceTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? ReturnConfigs[TypeKey] extends BaseInterfaceReturnConfig<
      TypeConfigs,
      TypeKey
    >
    ? {
        transformer: (
          originalData: OriginalType,
          transformed: {
            [TransformedProperty in keyof ReturnConfigs[TypeKey]["propertyReturnTypes"]]: ReturnConfigs[TypeKey]["propertyReturnTypes"][TransformedProperty];
          }
        ) => Promise<ReturnConfigs[TypeKey]["returnType"]>;
        properties: {
          [Property in keyof ReturnConfigs[TypeKey]["propertyReturnTypes"]]: TypeConfigs[TypeKey]["properties"][Property] extends keyof TypeConfigs
            ? (
                originalData: IfExtendsArrayThenWrap<
                  TypeConfigs[TypeKey]["type"][Property],
                  TypeConfigs[TypeConfigs[TypeKey]["properties"][Property]]["type"]
                >,
                transformed: IfExtendsArrayThenWrap<
                  TypeConfigs[TypeKey]["type"][Property],
                  ReturnConfigs[TypeConfigs[TypeKey]["properties"][Property]]["returnType"]
                >
              ) => Promise<
                ReturnConfigs[TypeKey]["propertyReturnTypes"][Property]
              >
            : never;
        };
      }
    : never
  : never;
