import type { JoinStringList, OrdSubset } from "./utils.js";

type ExtendsClause<
  Subtype extends string,
  TyList extends readonly [string, ...string[]],
  AssignDefault extends OrdSubset<TyList> | [] = [],
> = `${Subtype} extends ${JoinStringList<TyList, "|">}${AssignDefault extends []
  ? ""
  : `=${JoinStringList<AssignDefault, "|">}`}`;
