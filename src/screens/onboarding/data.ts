import Onboard3 from '@assets/img/onboard3.jpg';
import Onboard1 from '@assets/img/onboard1.jpg';
import Onboard2 from '@assets/img/onboard2.jpg';

import {ImageProps} from 'react-native';

export type Slide = {
  id: string;
  image: ImageProps;
  title: string;
  redTitle: string;
  text: string;
  thirdText?: string;
};

export const Slides: Slide[] = [
  {
    id: '1',
    image: Onboard1,
    title: 'Match with riders that',
    redTitle: 'always deliver',
    text: 'With our highly-rated riders, you can be sure of every delivery request being fulfilled in a safe and timely order.',
  },
  {
    id: '2',
    image: Onboard2,
    title: 'because we care',
    redTitle: 'Best rates ',
    text: 'Transparency and commitment to deliver value - all to put your mind at ease.',
  },
  {
    id: '3',
    image: Onboard3,
    title: 'Book your deliveries',
    redTitle: 'in advance',
    text: 'Schedule a delivery and enjoy the convenience and peace of mind of our service.',
  },
];
