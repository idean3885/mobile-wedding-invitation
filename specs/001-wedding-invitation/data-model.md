# Data Model: 모바일 청첩장

모든 데이터는 `src/lib/data/wedding.ts`에 정적으로 정의된다. 런타임 데이터 소스 없음.

## Entities

### Wedding (예식 정보)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| groomName | string | ✅ | 신랑 이름 |
| brideName | string | ✅ | 신부 이름 |
| groomParents | { father: string, mother: string } | ✅ | 신랑측 부모 이름 |
| brideParents | { father: string, mother: string } | ✅ | 신부측 부모 이름 |
| groomRank | string | ✅ | 신랑 서열 (예: "장남") |
| brideRank | string | ✅ | 신부 서열 (예: "차녀") |
| date | string | ✅ | 예식 일시 (표시용 텍스트) |
| heroImage | string | ✅ | 대문 대표 사진 경로 |
| greeting | string | ✅ | 인사말 본문 |

### Gallery (갤러리)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| photos | GalleryPhoto[] | ✅ | 사진 목록 (10~20장) |

#### GalleryPhoto

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| src | string | ✅ | 이미지 원본 경로 |
| alt | string | ✅ | 대체 텍스트 |
| order | number | ✅ | 표시 순서 |

### Venue (오시는 길)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| name | string | ✅ | 예식장 이름 |
| address | string | ✅ | 주소 |
| mapImage | string | ✅ | 지도 정적 이미지 경로 |
| mapLink | string | ✅ | 외부 지도 앱 연결 URL |
| directions | DirectionGroup[] | ✅ | 교통 안내 |

#### DirectionGroup

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| type | "subway" \| "bus" \| "car" | ✅ | 교통 수단 |
| description | string | ✅ | 안내 텍스트 |

### Account (계좌 정보)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| accounts | AccountEntry[] | ✅ | 전체 계좌 목록 |

#### AccountEntry

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| side | "groom" \| "bride" | ✅ | 신랑측/신부측 |
| relation | "self" \| "father" \| "mother" | ✅ | 관계 |
| bank | string | ✅ | 은행명 |
| holder | string | ✅ | 예금주 |
| number | string | ✅ | 계좌번호 |

## Relationships

```text
Wedding (1) ──references── (1) Venue   (예식장 정보는 Venue 엔티티 참조)
Wedding (1) ──contains──  (1) Gallery
Wedding (1) ──contains──  (N) Account  (최대 6: 측당 3)
Gallery (1) ──contains── (N) GalleryPhoto  (10~20)
Venue   (1) ──contains── (N) DirectionGroup  (3: subway/bus/car)
```

## Validation Rules

- `accounts`: 최소 1개, 최대 6개. `side`별 최대 3개.
- `photos`: 최소 1장. `order` 값은 유일해야 함.
- `heroImage`, `mapImage`: 유효한 이미지 경로.
- `mapLink`: 유효한 URL (https://).
- 모든 `string` 필드: 빈 문자열 불가.
