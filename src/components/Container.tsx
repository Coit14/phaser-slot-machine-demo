import { Math } from 'phaser';
import { Container as PhaserContainer, Sprite } from 'phaser-jsx';
import type { ComponentProps } from 'react';

import { REEL_SYMBOL_HEIGHT } from '../game/reels/reelConstants';

const SYMBOLS_ROWS = 5;

export function Container(props: ComponentProps<typeof PhaserContainer>) {
  return (
    <PhaserContainer {...props}>
      {Array(SYMBOLS_ROWS)
        .fill(null)
        .map((_, index) => (
          <Sprite
            x={0}
            y={-REEL_SYMBOL_HEIGHT * index}
            texture="symbols"
            frame={`symbols_${random()}.png`}
          />
        ))}
    </PhaserContainer>
  );
}

function random() {
  return Math.Between(0, 9);
}
