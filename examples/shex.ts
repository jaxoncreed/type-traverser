import { universalTraverserFactory } from "../lib";
import expect from "expect";
import {
  Annotation,
  EachOf,
  IriStem,
  IriStemRange,
  Language,
  LanguageStem,
  LanguageStemRange,
  LiteralStem,
  LiteralStemRange,
  NodeConstraint,
  ObjectLiteral,
  OneOf,
  Schema,
  SemAct,
  Shape,
  ShapeAnd,
  shapeExpr,
  ShapeExternal,
  ShapeNot,
  ShapeOr,
  TripleConstraint,
  tripleExpr,
  valueSetValue,
  Wildcard,
} from "shexj";

const friendNetworkTraverser = universalTraverserFactory<
  {
    Schema: {
      kind: "interface";
      type: Schema;
      properties: {
        startActs: "SemAct";
        start: "shapeExpr";
        shapes: "shapeExpr";
      };
    };
    ShapeOr: {
      kind: "interface";
      type: ShapeOr;
      properties: {
        shapeExprs: "shapeExpr";
      };
    };
    ShapeAnd: {
      kind: "interface";
      type: ShapeAnd;
      properties: {
        shapeExprs: "shapeExpr";
      };
    };
    ShapeNot: {
      kind: "interface";
      type: ShapeNot;
      properties: {
        shapeExpr: "shapeExpr";
      };
    };
    ShapeExternal: {
      kind: "interface";
      type: ShapeExternal;
      properties: {};
    };
    NodeConstraint: {
      kind: "interface";
      type: NodeConstraint;
      properties: {
        values: "valueSetValue";
      };
    };
    ObjectLiteral: {
      kind: "interface";
      type: ObjectLiteral;
      properties: {};
    };
    IriStem: {
      kind: "interface";
      type: IriStem;
      properties: {};
    };
    IriStemRange: {
      kind: "interface";
      type: IriStemRange;
      properties: {
        exclusions: "IriStem";
      };
    };
    LiteralStem: {
      kind: "interface";
      type: LiteralStem;
      properties: {};
    };
    LiteralStemRange: {
      kind: "interface";
      type: LiteralStemRange;
      properties: {
        exclusions: "LiteralStem";
      };
    };
    Language: {
      kind: "interface";
      type: Language;
      properties: {};
    };
    LanguageStem: {
      kind: "interface";
      type: LanguageStem;
      properties: {};
    };
    LanguageStemRange: {
      kind: "interface";
      type: LanguageStemRange;
      properties: {
        exclusions: "LanguageStem";
      };
    };
    Wildcard: {
      kind: "interface";
      type: Wildcard;
      properties: {};
    };
    Shape: {
      kind: "interface";
      type: Shape;
      properties: {
        expression: "tripleExpr";
        semActs: "SemAct";
        annotations: "Annotation";
      };
    };
    EachOf: {
      kind: "interface";
      type: EachOf;
      properties: {
        expressions: "tripleExpr";
        semActs: "SemAct";
        annotations: "Annotation";
      };
    };
    OneOf: {
      kind: "interface";
      type: OneOf;
      properties: {
        expressions: "tripleExpr";
        semActs: "SemAct";
        annotations: "Annotation";
      };
    };
    TripleConstraint: {
      kind: "interface";
      type: TripleConstraint;
      properties: {
        valueExpr: "shapeExpr";
        semActs: "SemAct";
        annotations: "Annotation";
      };
    };
    SemAct: {
      kind: "interface";
      type: SemAct;
      properties: {};
    };
    Annotation: {
      kind: "interface";
      type: Annotation;
      properties: {};
    };
    shapeExpr: {
      kind: "union";
      type: shapeExpr;
      typeKeys:
        | "ShapeOr"
        | "ShapeAnd"
        | "ShapeNot"
        | "NodeConstraint"
        | "Shape"
        | "ShapeExternal";
    };
    valueSetValue: {
      kind: "union";
      type: valueSetValue;
      typeKeys:
        | "ObjectLiteral"
        | "IriStem"
        | "IriStemRange"
        | "LiteralStem"
        | "LiteralStemRange"
        | "Language"
        | "LanguageStem"
        | "LanguageStemRange";
    };
    tripleExpr: {
      kind: "union";
      type: tripleExpr;
      typeKeys: "EachOf" | "OneOf" | "TripleConstraint";
    };
  },
  {
    Schema: {
      returnType: string;
      propertyReturnTypes: {
        startActs: string;
        start: string;
        shapes: string;
      };
    };
    ShapeOr: {
      returnType: string;
      propertyReturnTypes: {
        shapeExprs: string;
      };
    };
    ShapeAnd: {
      returnType: string;
      propertyReturnTypes: {
        shapeExprs: string;
      };
    };
    ShapeNot: {
      returnType: string;
      propertyReturnTypes: {
        shapeExpr;
      };
    };
    ShapeExternal: {
      returnType: string;
      propertyReturnTypes: {};
    };
    NodeConstraint: {
      returnType: string;
      propertyReturnTypes: {
        values: string;
      };
    };
    ObjectLiteral: {
      returnType: string;
      propertyReturnTypes: {};
    };
    IriStem: {
      returnType: string;
      propertyReturnTypes: {};
    };
    IriStemRange: {
      returnType: string;
      propertyReturnTypes: {
        exclusions: string;
      };
    };
    LiteralStem: {
      returnType: string;
      propertyReturnTypes: {};
    };
    LiteralStemRange: {
      returnType: string;
      propertyReturnTypes: {
        exclusions: string;
      };
    };
    Language: {
      returnType: string;
      propertyReturnTypes: {};
    };
    LanguageStem: {
      returnType: string;
      propertyReturnTypes: {};
    };
    LanguageStemRange: {
      returnType: string;
      propertyReturnTypes: {
        exclusions: string;
      };
    };
    Wildcard: {
      returnType: string;
      propertyReturnTypes: {};
    };
    Shape: {
      returnType: string;
      propertyReturnTypes: {
        expression: string;
        semActs: string;
        annotations: string;
      };
    };
    EachOf: {
      returnType: string;
      propertyReturnTypes: {
        expressions: string;
        semActs: string;
        annotations: string;
      };
    };
    OneOf: {
      returnType: string;
      propertyReturnTypes: {
        expressions: string;
        semActs: string;
        annotations: string;
      };
    };
    TripleConstraint: {
      returnType: string;
      propertyReturnTypes: {
        valueExpr: string;
        semActs: string;
        annotations: string;
      };
    };
    SemAct: {
      returnType: string;
      propertyReturnTypes: {};
    };
    Annotation: {
      returnType: string;
      propertyReturnTypes: {};
    };
    shapeExpr: {
      returnType: string;
    };
    valueSetValue: {
      returnType: string;
    };
    tripleExpr: {
      returnType: string;
    };
  }
>({
  Schema: {
    kind: "interface",
    properties: {
      startActs: "SemAct",
      start: "shapeExpr",
      shapes: "shapeExpr",
    },
  },
  ShapeOr: {
    kind: "interface",
    properties: {
      shapeExprs: "shapeExpr",
    },
  },
  ShapeAnd: {
    kind: "interface",
    properties: {
      shapeExprs: "shapeExpr",
    },
  },
  ShapeNot: {
    kind: "interface",
    properties: {
      shapeExpr: "shapeExpr",
    },
  },
  ShapeExternal: {
    kind: "interface",
    properties: {},
  },
  NodeConstraint: {
    kind: "interface",
    properties: {
      values: "valueSetValue",
    },
  },
  ObjectLiteral: {
    kind: "interface",
    properties: {},
  },
  IriStem: {
    kind: "interface",
    properties: {},
  },
  IriStemRange: {
    kind: "interface",
    properties: {
      exclusions: "IriStem",
    },
  },
  LiteralStem: {
    kind: "interface",
    properties: {},
  },
  LiteralStemRange: {
    kind: "interface",
    properties: {
      exclusions: "LiteralStem",
    },
  },
  Language: {
    kind: "interface",
    properties: {},
  },
  LanguageStem: {
    kind: "interface",
    properties: {},
  },
  LanguageStemRange: {
    kind: "interface",
    properties: {
      exclusions: "LanguageStem",
    },
  },
  Wildcard: {
    kind: "interface",
    properties: {},
  },
  Shape: {
    kind: "interface",
    properties: {
      expression: "tripleExpr",
      semActs: "SemAct",
      annotations: "Annotation",
    },
  },
  EachOf: {
    kind: "interface",
    properties: {
      expressions: "tripleExpr",
      semActs: "SemAct",
      annotations: "Annotation",
    },
  },
  OneOf: {
    kind: "interface",
    properties: {
      expressions: "tripleExpr",
      semActs: "SemAct",
      annotations: "Annotation",
    },
  },
  TripleConstraint: {
    kind: "interface",
    properties: {
      valueExpr: "shapeExpr",
      semActs: "SemAct",
      annotations: "Annotation",
    },
  },
  SemAct: {
    kind: "interface",
    properties: {},
  },
  Annotation: {
    kind: "interface",
    properties: {},
  },
  shapeExpr: {
    kind: "union",
    detectType: async (original) => {
      if (typeof original === "string") {
        throw new Error("Cannot handle string shape expressions");
      }
      return original.type;
    },
  },
  valueSetValue: {
    kind: "union",
    detectType: async (original) => {
      if (typeof original === "string") {
        throw new Error("Cannot handle string valuesetvalue");
      }
      if (original.type) {
        return original.type as
          | "IriStem"
          | "LiteralStem"
          | "LanguageStem"
          | "IriStemRange"
          | "LiteralStemRange"
          | "Language"
          | "LanguageStemRange";
      }
      return "ObjectLiteral";
    },
  },
  tripleExpr: {
    kind: "union",
    detectType: async (original) => {
      if (typeof original === "string") {
        throw new Error("Cannot handle string valuesetvalue");
      }
      return original.type;
    }
  },
});

// const friendNetworkToStringTransformer = friendNetworkTraverser({
//   FriendlyPerson: {
//     transformer: async (
//       originalData: FriendlyPerson,
//       transformed: {
//         bestFriend: string;
//         friends: string;
//       }
//     ): Promise<string> => {
//       return `FriendlyPerson-${originalData.name}(${transformed.bestFriend}, ${transformed.friends})`;
//     },
//     properties: {
//       bestFriend: async (
//         originalData: Person,
//         transformed: string
//       ): Promise<string> => {
//         return `bestFriend(${transformed})`;
//       },
//       friends: async (
//         originalData: Person[],
//         transformed: string[]
//       ): Promise<string> => {
//         return `friends(${transformed.join(", ")})`;
//       },
//     },
//   },
//   WorkingPerson: {
//     transformer: async (
//       originalData: WorkingPerson,
//       transformed: {
//         coworkers: string;
//       }
//     ): Promise<string> => {
//       return `WorkingPerson-${originalData.name}(${transformed.coworkers})`;
//     },
//     properties: {
//       coworkers: async (
//         originalData: WorkingPerson[],
//         transformed: string[]
//       ): Promise<string> => {
//         return `coworkers(${transformed.join(",")})`;
//       },
//     },
//   },
//   Person: {
//     transformer: async (
//       originalData: Person,
//       transformed: string
//     ): Promise<string> => {
//       return `Person(${transformed})`;
//     },
//   },
// });

// const SampleData: Person = {
//   type: "FriendlyPerson",
//   name: "Alice",
//   bestFriend: {
//     type: "FriendlyPerson",
//     name: "Bob",
//     friends: [],
//   },
//   friends: [
//     {
//       type: "WorkingPerson",
//       name: "Charlie",
//       occupations: ["Influencer"],
//       coworkers: [
//         {
//           type: "WorkingPerson",
//           name: "David",
//           occupations: [],
//         },
//       ],
//     },
//   ],
// };

// friendNetworkToStringTransformer(SampleData, "Person").then((result: string) => {
//   console.log(result);
//   expect(result).toBe(
//     "Person(FriendlyPerson-Alice(bestFriend(Person(FriendlyPerson-Bob(undefined, friends()))), friends(Person(WorkingPerson-Charlie(coworkers(WorkingPerson-David(undefined)))))))"
//   );
// });
