// 예식 정보 타입 정의
export interface Wedding {
  groomName: string;
  brideName: string;
  groomParents: { father: string; mother: string };
  brideParents: { father: string; mother: string };
  groomRank: string;
  brideRank: string;
  date: string;
  heroImage: string;
  greeting: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  order: number;
}

export interface DirectionGroup {
  type: 'subway' | 'bus' | 'car';
  description: string;
}

export interface Venue {
  name: string;
  address: string;
  mapImage: string;
  mapLink: string;
  directions: DirectionGroup[];
}

export interface AccountEntry {
  side: 'groom' | 'bride';
  relation: 'self' | 'father' | 'mother';
  bank: string;
  holder: string;
  number: string;
}

// 플레이스홀더 데이터 - 실제 콘텐츠로 교체 필요
export const wedding: Wedding = {
  groomName: '동영',
  brideName: '지혜',
  groomParents: { father: '아버지성함', mother: '어머니성함' },
  brideParents: { father: '아버지성함', mother: '어머니성함' },
  groomRank: '장남',
  brideRank: '장녀',
  date: '2026년 O월 O일 토요일 오후 O시',
  heroImage: '/images/hero-placeholder.jpg',
  greeting:
    '서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며\n걸어가고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있도록\n축복해 주시면 감사하겠습니다.'
};

export const gallery: GalleryPhoto[] = [
  { src: '/images/gallery-01.jpg', alt: '웨딩 사진 1', order: 1 },
  { src: '/images/gallery-02.jpg', alt: '웨딩 사진 2', order: 2 },
  { src: '/images/gallery-03.jpg', alt: '웨딩 사진 3', order: 3 }
];

export const venue: Venue = {
  name: '예식장 이름',
  address: '서울특별시 OO구 OO로 000',
  mapImage: '/images/map.webp',
  mapLink: 'https://map.kakao.com/',
  directions: [
    { type: 'subway', description: 'O호선 OO역 O번 출구 도보 O분' },
    { type: 'bus', description: 'OOO, OOO번 OO 정류장 하차' },
    { type: 'car', description: '네비게이션 "예식장 이름" 검색' }
  ]
};

export const accounts: AccountEntry[] = [
  { side: 'groom', relation: 'self', bank: 'OO은행', holder: '동영', number: '000-0000-0000' },
  { side: 'groom', relation: 'father', bank: 'OO은행', holder: '아버지성함', number: '000-0000-0000' },
  { side: 'groom', relation: 'mother', bank: 'OO은행', holder: '어머니성함', number: '000-0000-0000' },
  { side: 'bride', relation: 'self', bank: 'OO은행', holder: '지혜', number: '000-0000-0000' },
  { side: 'bride', relation: 'father', bank: 'OO은행', holder: '아버지성함', number: '000-0000-0000' },
  { side: 'bride', relation: 'mother', bank: 'OO은행', holder: '어머니성함', number: '000-0000-0000' }
];
