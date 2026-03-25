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
  thumb: string;
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
  mapImage: string;  // keep for backward compat, can be empty
  mapLink: string;
  lat: number;
  lng: number;
  directions: DirectionGroup[];
  parking: string;
}

export interface AccountEntry {
  side: 'groom' | 'bride';
  relation: 'self' | 'father' | 'mother';
  bank: string;
  holder: string;
  number: string;
}

export const wedding: Wedding = {
  groomName: '동영',
  brideName: '지혜',
  groomParents: { father: '김병길', mother: '배진우' },
  brideParents: { father: '이창열', mother: '서승순' },
  groomRank: '장남',
  brideRank: '차녀',
  date: '2026년 6월 6일 토요일 오후 3시',
  heroImage: '/images/hero.webp',
  greeting:
    '사랑이 무엇인지 물어본다면,\n서로의 이름을 대답하기로 했습니다.\n\n낯선 이끌림이 익숙한 편안함이 된 오늘,\n이제는 든든한 \'우리\'로 시작하려 합니다.\n\n동영과 지혜의 시작에 함께해 주세요.\n축복의 자리에 귀한 걸음 부탁드립니다.'
};

export const gallery: GalleryPhoto[] = [
  { src: '/images/gallery-01.webp', thumb: '/images/gallery-01-thumb.webp', alt: '웨딩 사진 1', order: 1 },
  { src: '/images/gallery-02.webp', thumb: '/images/gallery-02-thumb.webp', alt: '웨딩 사진 2', order: 2 },
  { src: '/images/gallery-03.webp', thumb: '/images/gallery-03-thumb.webp', alt: '웨딩 사진 3', order: 3 },
  { src: '/images/gallery-04.webp', thumb: '/images/gallery-04-thumb.webp', alt: '웨딩 사진 4', order: 4 },
  { src: '/images/gallery-05.webp', thumb: '/images/gallery-05-thumb.webp', alt: '웨딩 사진 5', order: 5 },
  { src: '/images/gallery-06.webp', thumb: '/images/gallery-06-thumb.webp', alt: '웨딩 사진 6', order: 6 },
  { src: '/images/gallery-07.webp', thumb: '/images/gallery-07-thumb.webp', alt: '웨딩 사진 7', order: 7 },
  { src: '/images/gallery-08.webp', thumb: '/images/gallery-08-thumb.webp', alt: '웨딩 사진 8', order: 8 },
  { src: '/images/gallery-09.webp', thumb: '/images/gallery-09-thumb.webp', alt: '웨딩 사진 9', order: 9 },
  { src: '/images/gallery-10.webp', thumb: '/images/gallery-10-thumb.webp', alt: '웨딩 사진 10', order: 10 },
  { src: '/images/gallery-11.webp', thumb: '/images/gallery-11-thumb.webp', alt: '웨딩 사진 11', order: 11 },
  { src: '/images/gallery-12.webp', thumb: '/images/gallery-12-thumb.webp', alt: '웨딩 사진 12', order: 12 },
  { src: '/images/gallery-13.webp', thumb: '/images/gallery-13-thumb.webp', alt: '웨딩 사진 13', order: 13 },
  { src: '/images/gallery-14.webp', thumb: '/images/gallery-14-thumb.webp', alt: '웨딩 사진 14', order: 14 }
];

export const venue: Venue = {
  name: '더화이트베일 3층 V홀',
  address: '서울특별시 서초구 서초중앙로 14',
  mapImage: '',
  mapLink: 'https://map.naver.com/p/entry/place/12023277?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202603250027&locale=ko&svcName=map_pcv5',
  lat: 37.4847,
  lng: 127.0145,
  directions: [
    { type: 'subway', description: '3호선 남부터미널역 4-1번 출구 바로 앞 / 4번출구 도보 2분' },
    { type: 'bus', description: '\'남부터미널\' 정류장 하차 (간선, 지선, 직행버스 다수)' },
    { type: 'car', description: '경부 고속도로 서초 I.C (서초·서당방면) 500m 거리내' }
  ],
  parking: '맞은편 전용 주차타워 이용 (2시간 무료)'
};

export const accounts: AccountEntry[] = [
  { side: 'groom', relation: 'self', bank: '국민은행', holder: '김동영', number: '444402-01-331651' },
  { side: 'groom', relation: 'father', bank: '국민은행', holder: '김병길', number: '781002-01-148004' },
  { side: 'groom', relation: 'mother', bank: '신한은행', holder: '배진우', number: '110-366-348032' },
  { side: 'bride', relation: 'self', bank: '하나은행', holder: '이지혜', number: '653-910438-28407' },
  { side: 'bride', relation: 'father', bank: '농협은행', holder: '이창열', number: '411-12-379828' },
  { side: 'bride', relation: 'mother', bank: '하나은행', holder: '서승순', number: '633-072610-00108' }
];
