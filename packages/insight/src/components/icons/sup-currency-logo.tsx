import styled from 'styled-components';
import {motion, useAnimation} from 'framer-motion';
import {imageFadeIn} from 'src/utilities/animations';

const CurrencyIcon = styled(motion.sup)`
  margin-left: 3px;
`;

const SupCurrencyLogo = ({currency}: {currency: string}) => {
  const animationControls = useAnimation();
  let imgSrc: string;

  if (currency === 'BTE') {
    imgSrc = 'https://bitwebcore.net/img/logo-white.svg'; // Replace with the actual URL for the BTE logo
  } else {
    imgSrc = `https://bitpay.com/img/icon/currencies/${currency}.svg`;
  }

  return (
    <CurrencyIcon variants={imageFadeIn} initial='initial' animate={animationControls}>
      <img
        src={imgSrc}
        width={22}
        height={22}
        alt={currency + ' logo'}
        onLoad={() => animationControls.start('animate')}
      />
    </CurrencyIcon>
  );
};

export default SupCurrencyLogo;
