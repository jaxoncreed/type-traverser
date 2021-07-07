import {
  AbstractBaseTypeConfig,
  BaseReturnConfigs,
  BaseTypeConfigs,
} from "../../types";

// TypeConfig
export interface BaseUnionTypeConfig<
  OriginalType,
  TypeKeys extends string | number | symbol
> extends AbstractBaseTypeConfig<OriginalType> {
  kind: "union";
  typeKeys: TypeKeys;
}

// ReturnConfig
export type BaseUnionReturnConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseUnionTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? {
      returnType: any;
    }
  : never;

// DefaultReturnConfig
export type DefaultUnionReturnConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseUnionTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? {
      returnType: OriginalType;
    }
  : never;

// TraverserConfig
export type UnionTraverserConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseUnionTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? {
      kind: "union";
      detectType: (
        originalData: OriginalType
      ) => Promise<TypeConfigs[TypeKey]["typeKeys"]>;
    }
  : never;

// TransformerConfig
export type UnionTransformerConfig<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
> = TypeConfigs[TypeKey] extends BaseUnionTypeConfig<
  infer OriginalType,
  keyof TypeConfigs
>
  ? ReturnConfigs[TypeKey] extends BaseUnionReturnConfig<TypeConfigs, TypeKey>
    ? {
        transformer: TypeConfigs[TypeKey]["typeKeys"] extends keyof TypeConfigs
          ? (
              originalData: OriginalType,
              transformed: ReturnConfigs[TypeConfigs[TypeKey]["typeKeys"]]["returnType"]
            ) => Promise<ReturnConfigs[TypeKey]["returnType"]>
          : never;
      }
    : never
  : never;
