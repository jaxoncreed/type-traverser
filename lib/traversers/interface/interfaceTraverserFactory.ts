import {
  BaseReturnConfigs,
  BaseTypeConfigs,
  Traverser,
  Traversers,
} from "../../types";
import { InterfaceTraverserConfig } from "./interfaceTraverserTypes";

export default function interfaceTraverserFactory<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
>(
  traverserConfig: InterfaceTraverserConfig<TypeConfigs, TypeKey>,
  traverserKey: keyof TypeConfigs,
  getTraversers: () => Traversers<TypeConfigs, ReturnConfigs>
): Traverser<TypeConfigs, ReturnConfigs, TypeKey> {
  return async (originalData: any, transformerConfigs: any): Promise<any> => {
    const transformedChildren: any = {};
    await Promise.all(
      Object.entries(traverserConfig.properties).map(
        async ([propertyKey, propertyConfig]: [string, any]) => {
          if (originalData[propertyKey]) {
            let traversed: any;
            if (Array.isArray(originalData[propertyKey])) {
              traversed = await Promise.all(
                originalData[propertyKey].map(async (curData: any) => {
                  return await getTraversers()[propertyConfig](
                    curData,
                    transformerConfigs
                  );
                })
              );
            } else {
              traversed = await getTraversers()[propertyConfig](
                originalData[propertyKey],
                transformerConfigs
              );
            }
            transformedChildren[propertyKey] = await transformerConfigs[
              traverserKey
            ].properties[propertyKey](originalData[propertyKey], traversed);
          }
        }
      )
    );
    const transformed = await transformerConfigs[traverserKey].transformer(
      originalData,
      transformedChildren
    );
    return transformed;
  };
}
