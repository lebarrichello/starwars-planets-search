/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js'; // Make sure to import anime.js properly
import '../styles/AnimatedSVG.css';

function AnimatedSVGComponent() {
  const twohundredandfifty = 250;
  const six = 6;

  useEffect(() => {
    const animation = anime.timeline({
      duration: 1750,
      easing: 'linear',
    });

    animation.add(
      {
        targets: 'g#text--offset path',
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        delay: anime.stagger(twohundredandfifty),
      },
      '+=250',
    );

    animation.add({
      targets: 'g#text--translate',
      translateY: [six, 0],
    });
  }, []);

  return (
    <div className="container__svg">
      <svg viewBox="0 0 100 58">

        <g id="text--offset">
          <g
            stroke="hsl(60, 100%, 50%)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <g transform="translate(5 10.5)">
              <g transform="translate(4 0)">
                <path d="M 0 10 h 8 a 7 7 0 0 0 0 -14 h 9 v -6 h -10 a 7 7 0 0 0 0 14 h -10 v 6 z" />
              </g>

              <g transform="translate(25 0)">
                <path d="M 0 -10 h 20 v 6 h -7 v 15 h -6 v -15 h -7 z" />
              </g>
              <g transform="translate(46 0)">
                <path d="M 0 10 l 7 -20 h 6 l 7 20 h -6 l -1.05 -3 h -5.9 l -1.05 3 z" />
                <path d="M 8 2 h 4 l -2 -5.7 -2 5.7 z" />
              </g>
              <g transform="translate(71 0)">
                <path d="M 0 -10 h 12 a 7 7 0 0 1 0 14 l 5 6 h -7 l -5 -6 v 6 h -5.5 z" />
                <path d="M 5 -5 h 5 a 2 2 0 0 1 0 4 h -5 z" />
              </g>
            </g>

            <g transform="translate(0 35)">
              <g stroke="hsl(60, 100%, 50%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <g transform="translate(0.5 0)">
                  <path d="M 0 -10 l 7 20 h 6 l 1.75 -5 1.75 5 h 6 l 7 -20 h -7 l -2.375 6.8 -2.375 -6.8 h -6 l -2.375 6.8 -2.375 -6.8 h -7z" />
                </g>
                <g transform="translate(30 0)">
                  <path d="M 0 10 l 7 -20 h 6 l 7 20 h -6 l -1.05 -3 h -5.9 l -1.05 3 z" />
                  <path d="M 8 2 h 4 l -2 -5.7 -2 5.7 z" />
                </g>
                <g transform="translate(56 0)">
                  <path d="M 0 -10 h 12 a 7 7 0 0 1 0 14 l 5 6 h -7 l -5 -6 v 6 h -5.5 z" />
                  <path d="M 5 -5 h 5 a 2 2 0 0 1 0 4 h -5 z" />
                </g>
                <g transform="translate(82.5 0)">
                  <path d="M 0 10 h 8 a 7 7 0 0 0 0 -14 h 9 v -6 h -10 a 7 7 0 0 0 0 14 h -10 v 6 z" />
                </g>
              </g>
            </g>
          </g>
        </g>

        <g id="text--translate">
          <text
            x="50"
            y="58"
            textLength="50"
            lengthAdjust="spacing"
            textAnchor="middle"
            fill="hsl(0, 0%, 100%)"
            style={ {
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
              fontSize: '6px',
              fontWeight: 'bold',
            } }
          >
            Planets
          </text>
        </g>
      </svg>
    </div>
  );
}

export default AnimatedSVGComponent;
