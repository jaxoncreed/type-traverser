import {
  BaseReturnConfigs,
  BaseTypeConfigs,
  Traverser,
  Traversers,
  UnionTraverserConfig,
} from "../types";

export default function unionTraverserFactory<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
>(
  traverserConfig: UnionTraverserConfig<TypeConfigs, TypeKey>,
  traverserKey: keyof TypeConfigs,
  getTraversers: () => Traversers<TypeConfigs, ReturnConfigs>
): Traverser<TypeConfigs, ReturnConfigs, TypeKey> {
  return async (
    originalData: any,
    transformerConfigs: any
  ): Promise<any> => {
    const specificTypeTraverserKey = await traverserConfig.detectType(
      originalData
    );
    const transformedChild = await getTraversers()[specificTypeTraverserKey](
      originalData,
      transformerConfigs
    );
    return await transformerConfigs[traverserKey].transformer(
      originalData,
      transformedChild
    );
  };
}
