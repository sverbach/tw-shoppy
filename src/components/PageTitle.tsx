import { useRef } from 'react';
import VariableProximity from './TextAnimations/VariableProximity/VariableProximity';

interface Props {
  titleText: string;
}

export function PageTitle({ titleText }: Props) {
  const containerRef = useRef(null);

  return (
    <>
      <div ref={containerRef} className="relative font-bold">
        <VariableProximity
          label={titleText}
          className={'text-primary pointer-events-none ms-[-5px] mt-[-5px] text-8xl'}
          fromFontVariationSettings="'wght' 700, 'opsz' 9"
          toFontVariationSettings="'wght' 900, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        ></VariableProximity>
      </div>
    </>
  );
}
