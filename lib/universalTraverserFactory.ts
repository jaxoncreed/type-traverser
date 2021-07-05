/**
 * Helpers
 */
 export type IfExtendsArrayThenWrap<Extends, ToWrap> =  NonNullable<Extends> extends Array<
 infer ArrayContent
>
 ? Array<ToWrap>
 : ToWrap;

/**
* TypeConfigs Definitions
*/
export interface BaseTypeConfig<OriginalType> {
 kind: string;
 type: OriginalType;
}

export interface BaseInterfaceTypeConfig<
 OriginalType,
 TypeKeys extends string | number | Symbol
> extends BaseTypeConfig<OriginalType> {
 kind: "interface";
 properties: Partial<
   {
     [Property in keyof OriginalType]: TypeKeys;
   }
 >;
}

export interface BaseUnionTypeConfig<
 OriginalType,
 TypeKeys extends string | number | symbol
> extends BaseTypeConfig<OriginalType> {
 kind: "union";
 typeKeys: TypeKeys;
}

// TODO special checking to be sure this is a valid generic
export type BaseTypeConfigs = {
 [key: string]:
   | BaseInterfaceTypeConfig<any, string>
   | BaseUnionTypeConfig<any, string>;
};

/**
* Return Configs
*/
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

export type BaseReturnConfig<
 TypeConfigs extends BaseTypeConfigs,
 TypeKey extends keyof TypeConfigs
> =
 | BaseInterfaceReturnConfig<TypeConfigs, TypeKey>
 | BaseUnionReturnConfig<TypeConfigs, TypeKey>;

export type BaseReturnConfigs<TypeConfigs extends BaseTypeConfigs> = {
 [TypeKey in keyof TypeConfigs]: BaseReturnConfig<TypeConfigs, TypeKey>;
};

/**
* Default Return Configs
*/
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

export type DefaultReturnConfig<
 TypeConfigs extends BaseTypeConfigs,
 TypeKey extends keyof TypeConfigs
> =
 | DefaultInterfaceReturnConfig<TypeConfigs, TypeKey>
 | DefaultUnionReturnConfig<TypeConfigs, TypeKey>;

export type DefaultReturnConfigs<TypeConfigs extends BaseTypeConfigs> = {
 [TypeKey in keyof TypeConfigs]: DefaultReturnConfig<TypeConfigs, TypeKey>;
};

/**
* TraverserConfigs Definitions
*/
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

export type TraverserConfig<
 TypeConfigs extends BaseTypeConfigs,
 TypeKey extends keyof TypeConfigs
> =
 | InterfaceTraverserConfig<TypeConfigs, TypeKey>
 | UnionTraverserConfig<TypeConfigs, TypeKey>;

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

export type TransformerConfig<
 TypeConfigs extends BaseTypeConfigs,
 ReturnConfigs extends BaseReturnConfigs<TypeConfigs>,
 TypeKey extends keyof TypeConfigs
> =
 | InterfaceTransformerConfig<TypeConfigs, ReturnConfigs, TypeKey>
 | UnionTransformerConfig<TypeConfigs, ReturnConfigs, TypeKey>;

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
       switch (traverserConfig.kind) {
         case "interface":
           return [
             traverserKey,
             async (
               originalData: any,
               transformerConfigs: any
             ): Promise<any> => {
               const transformedChildren: any = {};
               await Promise.all(
                 Object.entries(traverserConfig.properties).map(
                   async ([propertyKey, propertyConfig]: [string, any]) => {
                     if (originalData[propertyKey]) {
                       let traversed: any;
                       if (Array.isArray(originalData[propertyKey])) {
                         traversed = await Promise.all(
                           originalData[propertyKey].map(
                             async (curData: any) => {
                               return await traversers[propertyConfig](
                                 curData,
                                 transformerConfigs
                               );
                             }
                           )
                         );
                       } else {
                         traversed = await traversers[propertyConfig](
                           originalData[propertyKey],
                           transformerConfigs
                         );
                       }
                       transformedChildren[propertyKey] =
                         await transformerConfigs[traverserKey].properties[
                           propertyKey
                         ](originalData[propertyKey], traversed);
                     }
                   }
                 )
               );
               const transformed = await transformerConfigs[
                 traverserKey
               ].transformer(originalData, transformedChildren);
               return transformed;
             },
           ];
           break;
         case "union":
           return [
             traverserKey,
             async (
               originalData: any,
               transformerConfigs: any
             ): Promise<any> => {
               const specificTypeTraverserKey =
                 await traverserConfig.detectType(originalData);
               const transformedChild = await traversers[
                 specificTypeTraverserKey
               ](originalData, transformerConfigs);
               return await transformerConfigs[traverserKey].transformer(
                 originalData,
                 transformedChild
               );
             },
           ];
           break;
       }
     }
   )
 );
 return (
   transformerConfigs: TransformerConfigs<TypeConfigs, ReturnConfigs>
 ): UniversalTransformer<TypeConfigs> => {
   return (dataToTraverse: any, typeKey: keyof TypeConfigs): any => {
     return traversers[typeKey](dataToTraverse, transformerConfigs);
   };
 };
}
