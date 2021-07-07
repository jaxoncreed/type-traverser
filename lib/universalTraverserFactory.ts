import traverserFactory from "./traversers/traverserFactory";
import {
  BaseTypeConfigs,
  BaseReturnConfigs,
  DefaultReturnConfigs,
  TraverserConfigs,
  UniversalTraverser,
  Traversers,
  TraverserConfig,
  Traverser,
  TransformerConfigs,
  UniversalTransformer
} from "./types";

/**
 * traverserFactory
 * @param traversersConfig
 * @returns
 */
export function universalTraverserFactory<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs> = DefaultReturnConfigs<TypeConfigs>
>(
  traversersConfig: TraverserConfigs<TypeConfigs>
): UniversalTraverser<TypeConfigs, ReturnConfigs> {
  let traversers: Traversers<TypeConfigs, ReturnConfigs>;
  const getTraversers = () => traversers;
  // Required TS Ignore because Object.fromEntries hard codes "string" as the
  // key type and traversers require a key type of "keyof TypeConfigs"
  // @ts-ignore
  traversers = Object.fromEntries(
    Object.entries(traversersConfig).map(
      ([traverserKey, traverserConfig]: [
        keyof TypeConfigs,
        TraverserConfig<TypeConfigs, keyof TypeConfigs>
      ]): [
        keyof TypeConfigs,
        Traverser<TypeConfigs, ReturnConfigs, keyof TypeConfigs>
      ] => {
        return [
          traverserKey,
          traverserFactory(traverserConfig, traverserKey, getTraversers)
        ]
      }
    )
  );
  console.log(traversers);
  return (
    transformerConfigs: TransformerConfigs<TypeConfigs, ReturnConfigs>
  ): UniversalTransformer<TypeConfigs> => {
    return (dataToTraverse: any, typeKey: keyof TypeConfigs): any => {
      return traversers[typeKey](dataToTraverse, transformerConfigs);
    };
  };
}
