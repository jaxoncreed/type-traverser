import { BaseReturnConfigs, BaseTypeConfigs } from "../types";
import {
  BaseInterfaceReturnConfig,
  BaseInterfaceTypeConfig,
  DefaultInterfaceReturnConfig,
  InterfaceTransformerConfig,
  InterfaceTraverserConfig,
} from "./interface/interfaceTraverserTypes";
import {
  BaseUnionReturnConfig,
  BaseUnionTypeConfig,
  DefaultUnionReturnConfig,
  UnionTransformerConfig,
  UnionTraverserConfig,
} from "./union/unionTraverserTypes";

// TypeConfig
export type BaseTypeConfig<
  OriginalType,
  TypeKeys extends string | number | symbol
> =
  | BaseInterfaceTypeConfig<OriginalType, TypeKeys>
  | BaseUnionTypeConfig<OriginalType, TypeKeys>;

// ReturnConfig
export type BaseReturnConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> =
  | BaseInterfaceReturnConfig<TypeConfigs, TypeKey>
  | BaseUnionReturnConfig<TypeConfigs, TypeKey>;

// DefaultReturnConfig
export type DefaultReturnConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> =
  | DefaultInterfaceReturnConfig<TypeConfigs, TypeKey>
  | DefaultUnionReturnConfig<TypeConfigs, TypeKey>;

// TraverserConfig
export type TraverserConfig<
  TypeConfigs extends BaseTypeConfigs,
  TypeKey extends keyof TypeConfigs
> =
  | InterfaceTraverserConfig<TypeConfigs, TypeKey>
  | UnionTraverserConfig<TypeConfigs, TypeKey>;

// TransformerConfig
export type TransformerConfig<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
> =
  | InterfaceTransformerConfig<TypeConfigs, ReturnConfigs, TypeKey>
  | UnionTransformerConfig<TypeConfigs, ReturnConfigs, TypeKey>;
