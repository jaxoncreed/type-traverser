import {
  BaseReturnConfig,
  BaseTypeConfig,
  DefaultReturnConfig,
  TransformerConfig,
  TraverserConfig,
} from "./traversers/traverserTypes";

/**
 * Helpers
 */
export type IfExtendsArrayThenWrap<Extends, ToWrap> =
  NonNullable<Extends> extends Array<infer ArrayContent>
    ? Array<ToWrap>
    : ToWrap;

/**
 * TypeConfigs Definitions
 */
export interface AbstractBaseTypeConfig<OriginalType> {
  kind: string;
  type: OriginalType;
}

// TODO special checking to be sure this is a valid generic
export type BaseTypeConfigs = {
  [key: string]: BaseTypeConfig<any, string>;
};

/**
 * Return Configs
 */
export type BaseReturnConfigs<TypeConfigs extends BaseTypeConfigs> = {
  [TypeKey in keyof TypeConfigs]: BaseReturnConfig<TypeConfigs, TypeKey>;
};

/**
 * Default Return Configs
 */
export type DefaultReturnConfigs<TypeConfigs extends BaseTypeConfigs> = {
  [TypeKey in keyof TypeConfigs]: DefaultReturnConfig<TypeConfigs, TypeKey>;
};

/**
 * TraverserConfigs Definitions
 */
export type TraverserConfigs<TypeConfigs extends BaseTypeConfigs> = {
  [TypeKey in keyof TypeConfigs]: TraverserConfig<TypeConfigs, TypeKey>;
};

/**
 * Traverser Definitions
 */
export type Traverser<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
> = (
  originalData: TypeConfigs[TypeKey]["type"],
  transformerConfigs: TransformerConfigs<TypeConfigs, ReturnConfigs>
) => Promise<ReturnConfigs[TypeKey]["returnType"]>;

export type Traversers<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>
> = {
  [TypeKey in keyof TypeConfigs]: Traverser<
    TypeConfigs,
    ReturnConfigs,
    TypeKey
  >;
};

/**
 * Transformer Definitions
 */
export type TransformerConfigs<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>
> = {
  [TypeKey in keyof TypeConfigs]: TransformerConfig<
    TypeConfigs,
    ReturnConfigs,
    TypeKey
  >;
};

/**
 * Factory Returns (UniversalTraverser / Universal Transformers)
 */
export type UniversalTraverser<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>
> = (
  transformerConfigs: TransformerConfigs<TypeConfigs, ReturnConfigs>
) => UniversalTransformer<TypeConfigs>;

// TODO: Special Checks in turing complete typings
export type UniversalTransformer<TypeConfigs extends BaseTypeConfigs> = (
  dataToTraverse: any,
  typeKey: keyof TypeConfigs
) => any;
