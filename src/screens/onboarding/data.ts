import Onboard3 from '@assets/img/onboard1.png';
import Onboard1 from '@assets/img/onboard2.png';
import Onboard2 from '@assets/img/onboard3.png';

import {ImageProps} from 'react-native';

export type Slide = {
  id: string;
  image: ImageProps;
  title: string;

  text: string;
};

export const Slides: Slide[] = [
  {
    id: '1',
    image: Onboard3,
    title: 'Welcome To PrimeBaazar',

    text: 'The stress free platform to declutter your items easily.  Put your items up for sale, get a buyer and get paid.',
  },
  {
    id: '2',
    image: Onboard1,
    title: 'Declutter Made Easy',

    text: ' Declutter your items in just 3 steps: Register on the app, put your items up for sale, and get paid.',
  },
  {
    id: '3',
    image: Onboard2,
    title: 'Receive Payments',

    text: 'Receive payments from sales right in your wallet when you make sakes',
  },
];
