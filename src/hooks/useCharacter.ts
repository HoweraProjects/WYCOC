import { useCallback, useEffect, useRef, useState } from 'react';
import type { Character } from '../types';
import { createCharacter } from '../logic/character';

const STORAGE_KEY = 'coc-card-maker:character';

function load(): Character {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // 合并默认值，兼容旧数据
      return { ...createCharacter(), ...parsed };
    }
  } catch {
    /* ignore */
  }
  return createCharacter();
}

export function useCharacter() {
  const [character, setCharacter] = useState<Character>(load);
  const timer = useRef<number | undefined>(undefined);

  // 防抖自动保存
  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
      } catch {
        /* quota or serialization error — ignore */
      }
    }, 400);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [character]);

  const update = useCallback((patch: Partial<Character> | ((c: Character) => Partial<Character>)) => {
    setCharacter((prev) => {
      const p = typeof patch === 'function' ? patch(prev) : patch;
      return { ...prev, ...p };
    });
  }, []);

  const reset = useCallback(() => {
    setCharacter(createCharacter());
  }, []);

  const replace = useCallback((c: Character) => {
    setCharacter({ ...createCharacter(), ...c });
  }, []);

  return { character, setCharacter, update, reset, replace };
}
