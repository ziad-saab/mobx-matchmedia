import { createAtom, IAtom } from "mobx";

const queryAtoms: Record<string, IAtom> = {};

export const matchMedia = (mediaQuery: string): boolean => {
  if (!('matchMedia' in window)) {
    console.warn('matchMedia not supported');
    return false;
  }

  const mql = window.matchMedia(mediaQuery);
  if (!queryAtoms[mediaQuery]) {
    let atom: IAtom;
    let currentMatches = mql.matches;
    const listener = (e: MediaQueryListEvent) => {
      if (currentMatches !== e.matches) {
        atom.reportChanged();
      }
      currentMatches = e.matches;
    };
    atom = createAtom(
      `matchMedia:${mediaQuery}`,
      () => mql.addEventListener("change", listener),
      () => {
        mql.removeEventListener("change", listener);
        delete queryAtoms[mediaQuery];
      }
    );
    queryAtoms[mediaQuery] = atom;
  }
  const queryAtom = queryAtoms[mediaQuery];
  queryAtom.reportObserved();
  if (!queryAtom.isBeingObserved_) {
    delete queryAtoms[mediaQuery];
  }
  return mql.matches;
};