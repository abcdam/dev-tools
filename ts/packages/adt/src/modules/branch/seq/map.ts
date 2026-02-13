import {
  bimap as bimapCore,
  mapLeft as mapLeftCore,
  mapRight as mapRightCore,
} from "@branch:core/map";
import type { Branch } from "@branch:core/types";

export const mapLeft =
  <L, L2>(mapFn: (leftValue: L) => L2) =>
  <R>(branch: Branch<L, R>): Branch<L2, R> =>
    mapLeftCore(branch, mapFn);

export const mapRight =
  <R, R2>(mapFn: (rightValue: R) => R2) =>
  <L>(branch: Branch<L, R>): Branch<L, R2> =>
    mapRightCore(branch, mapFn);

export const bimap =
  <L, R, VL, VR>(
    leftFn: (leftValue: L) => VL,
    rightFn: (rightValue: R) => VR,
  ) =>
  (branch: Branch<L, R>): Branch<VL, VR> =>
    bimapCore(branch, leftFn, rightFn);
