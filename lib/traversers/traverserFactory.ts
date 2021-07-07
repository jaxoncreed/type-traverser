import {
  BaseReturnConfigs,
  BaseTypeConfigs,
  Traverser,
  Traversers,
} from "../types";
import { TraverserConfig } from "./traverserTypes";
import interfaceTraverserFactory from "./interface/interfaceTraverserFactory";
import unionTraverserFactory from "./union/unionTraverserFactory";

export default function traverserFactory<
  TypeConfigs extends BaseTypeConfigs,
  ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
  TypeKey extends keyof TypeConfigs
>(
  traverserConfig: TraverserConfig<TypeConfigs, TypeKey>,
  traverserKey: keyof TypeConfigs,
  getTraversers: () => Traversers<TypeConfigs, ReturnConfigs>
): Traverser<TypeConfigs, ReturnConfigs, TypeKey> {
  switch (traverserConfig.kind) {
    case "interface":
      return interfaceTraverserFactory(
        traverserConfig,
        traverserKey,
        getTraversers
      );
    case "union":
      return unionTraverserFactory(
        traverserConfig,
        traverserKey,
        getTraversers
      );
  }
}
