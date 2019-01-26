import React from 'react'
import Doodle from './Doodle'
import theme from '../../config/theme'
import { lighten, darken, saturate } from 'polished'
import { bpMaxSM } from '../lib/breakpoints'

// #00b8a9, #f8f3d4, #f6416c, #ffde7d
// @grid: 5vmin / 100vmin 300px;

const primary = theme.brand.primary

const HeroPattern = () => (
  <Doodle
    rule={`:doodle {
      @grid: 5vmin / 100vmax 292px;
   
      overflow: hidden;
      position: absolute;
      right: -10%;
      top: 0;
      z-index: 2;
      opacity: 0.7;
    }
    background-image: @multi(6, (
          conic-gradient(
            @p(${lighten(0.3, theme.brand.primary)}, ${lighten(
      0.5,
      theme.brand.primary,
    )}, ${saturate(0.2, theme.brand.primary)}, ${lighten(
      0.4,
      theme.brand.primary,
    )}),
            calc(@n() * 100% / 9), transparent 0
          )
        ));
        transform: rotate(45deg);
        @size: 100%;
        mix-blend-mode: multiply;
        :after {
          content: '';
          @size: 60%;
          mix-blend-mode: soft-light;
          @shape: hexagon;
          background-image: conic-gradient(
            from @r(0, 360deg, 60),
            @p(#00b8a9, #f8f3d4, #f6416c, #ffde7d),
            @r(0%, 100%, @calc(100 / 6)), transparent 0
          );
        }
       `}
  />
)

export default HeroPattern
