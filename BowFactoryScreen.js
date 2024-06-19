import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function BowFactoryScreen({ route, navigation }) {
  const [selectedFactories, setSelectedFactories] = useState([]);
  const summaryData = {
    '서독산활공장': '동호회 팀에 속해있는 경우만 이용이 가능합니다. 착륙장 쉼터에 이용할때 팀명,전화번호 등을 기입해야되고,무전기 지참이 필요하다. 농작물 피해에 주의!',
    '매산리활공장': '군부대가 관리를 하고 있는 곳. 이용을 원할시 일주일 전부터는 미리 연락을 해야한다.(정보 제공 날짜 애매)',
    '불탄산이륙장': '5~11월 까지는 활공장 이용이 불가능하다. 착륙장이 논밭이여서 이 기간에는 농민피해를 방지하기 위해서 비행X.',
    '송라산활공장': '헬기장 겸 활공장으로 사용함 주변에 주차 공간 애매함 -> 자동차 이용 비추 대중교통 이용시 1) 너구내고개 정류장에서 도보 이동(25분 소요) 2) 삼익아파트 정류장에서 도보 이동(20분 소요) 3) 대영빌딩, 용호빌딩 정류장에서 도보 이동(30분 소요) 4) 송라찜질방 정류장에서 도보 이동(20분 소요)',
    '예봉산이륙장': '도보로는 팔당역에 내려서 예봉산 입구로 가고 예봉산에서 철운봉과 적갑산 가운데 쯤에 활공장이 위치해 있다.산을 올라가는 도중에 적갑산 방향의 표지판으로 가야된다.',
    '광교산이륙장': '수원에서 광교산 버스종점으로 오셔서 통신대 올라가는길로 올라가면 헬기장이 이륙장 입니다.군사훈련이 있을때는 이용이 안되며,착륙장이 매우 협소하다.',
    '대부도구봉산 이륙장': '대창산(구봉산)정상에 이륙장이 존재한다. 도보 15분 정도  이륙장에는 한대정도 이륙가능하다. 착륙시 해변가가 폭이 작고,물에 빠질 수 있으므로 주의 필요. 지도표시 애매',
    '서운산이륙장': '비행여견은 기체 1대 정도만 비행 할 수 있을 정도의 공간. 주차는 청룡사 쪽에 가능하다. 경로: 온적암->팔각정->이륙장 방향은 서운산 정상 방향',
    '은봉산이륙장': '현재도 무인 군 기지에 포함되어 수직 고도 등에 있어 비행에 제약이 많다. 입장료 없이 이용할 수 있다 찾아가는길->양주시 백석읍 지방도 39호선 소사고개에서 은봉산 임산 도로(林産道路)로 진입하여 정상까지 차량으로 이동할 수 있다.',
    '유명산이륙장': '업체가 따로 있다. ->옷,장비 빌리기 가능. 공터에 주차공간 따로 있다. 네이버에서 업체에 연락해서 예약을 해서 이용하는 경우가 대다수.',
    '정광산이륙장': '경기-서울 지역에서 인기가 많은 활공장, 착륙장이 활공장입구에 있다. 차로 올라가기 굉장히 힘든 곳.',
    '와우정사활공장': '',
    '원적산이륙장': '원적산 입구쪽인 영원사 주차장에 무료 주차 가능.',
    '혜음령이륙장': '군사 지역으로 인근 부대 비행 허락 필요함, 착륙장이 비교적 나이도가 높다. 찾아오는길-> 용미초등학교 조회, 통일로에서 송추 방향쪽으로 우회전 하다 광탄 방향으로 좌회전 차로도 이륙장 정상까지 올라갈수 있고 도보로는 30분 정도 걸리는 코스.',
    '박달산이륙장': '정상 부근에 헬기장(이륙장)이 존재. 착륙이 어렵다?',
    '어섬활공장': '개인으로 이용은 거의불가,개인별 이용료 만원 납부.동호회 팀으로 가야 이용이 가능한 곳.',
    '괘방산활공장': '안인해변 주차장에 차를 주차가능. 안인해변 주차장에서 활공장 까지는 1시간 정도 걸린다. 그리고 임해자연휴양림에도 주차가 가능한데, 여기서 활공장 까지는 20분 정도 걸린다.오후 4~5시가 되면 바람과,바다 때문에 페러글라이딩x.',
    '미시령이륙장': '',
    '봉수대이륙장': '',
    '초록봉활공장': '',
    '무릉활공장': '',
    '사명산이륙장': '착륙장:양구 종합 운동장 주변 공터이다. 차량으로 이륙장 까지 올라갈수 있지만,4륜차량만 가능하다.  이륙장과 착륙장과의 거리가 먼곳 하강할때, 공터를 이용하기때문에  전선충돌에 유의.',
    '봉래산이륙장': '',
    '기룡산이륙장': '인제 고등학교 뒤쪽에 있는 돌계단을 통해 올라가면 안내도가 나오는데, 전망대와 샘터 중간에 기룡산 활공장이 존재합니다.',
    '대룡산이륙장': '춘천 대룡산패러글라이딩 2이륙장 ->카카오 내비 기준 , 차로 문제없이 올라갈 수 있는 길, 동호회 활동으로만 이용이 가능한 곳',
    '장암산이륙장': '',
    '대관령활공장': '',
    '남산이륙장': '차로 올라가도 중턱쯤에 차를 세워두고 계단을 통해 3분정도 올라가야된다.  정보부족?',
    '식장산이륙장': '',
    '사곡이륙장': '',
    '덕기봉이륙장': '덕기봉이륙장=>금산IC ->37번국도(무주방향)->관천리정류장 우회전->관천리마을회관지나 직진(약15분)',
    '봉화산이륙장': '주변에 주차 공간 애매함 -> 자동차 이용 비추 대중교통 이용시, 수당리 정류장에서 도보 이동(30분 소요)',
    '왜목활공장': '',
    '오서산활공장': '헬기장 겸 활공장으로 사용함 오서산 자연휴양림 주차장에 주차 후 도보 이동(55분 소요) 대중교통 이용시 1) 광성리3구 정류장에서 도보 이동(45분 소요) 2) 성연리, 오서산상촌 생태마을 정류장에서 도보 이동(50분 소요)',
    '도비산활공장': '부석사 주차장에 주차 후 도보 이동(30분 소요) 대중교통 이용시, 부석 정류장에서 도보 이동(50분 소요)',
    '관모산이륙장': '향천사 주차장에 주차 후 도보 이동(80분 소요) 대중교통 이용시, 수철리 정류장에서 도보 이동(30분 소요)',
    '흑성산이륙장': '페러글라이딩 교육 및 체험비행 전문이다. 이용전에  연락이 꼭 필요하다. 주차공간은 흑성산 말고 독립기념관에 주차가 가능하다.',
    '백월산이륙장': '차로 정상부근까지 갈수 있지만,매우힘들다. 산 중턱에 작지만 주차공간이 마련되어 있다.1대씩 만 비행이 가능하다.',
    '두산활공장': '단양읍내에서 단양대교 건너서 좌회전하여 가다가 두산마을 간판보고끝까지 올라가면 두산 활공장에 도착 합니다.',
    '양백산이륙장': '',
    '백화산이륙장': '착륙장에서 포장도로를 따라 올라가는길(오래걸림), 레일을 따라 이동하는 길(시간은 빠르지만, 경사가 심하다) 가끔 활공장에 있는 믹스견이 안내해준다?',
    '진천활공장': '주변에 주차 공간 애매함 -> 자동차 이용 비추 대중교통 이용시, 원대 정류장에서 도보 이동(20분 소요)',
    '황령산이륙장': '황령산전망쉼터주차장에 주차 후 도보 이동 (주차장이 협소함) -> 주차장에서 이륙장까지는 약 15-20분 정도 소요 대중교통 이용시 대동아파트, 전포삼거리, 전포고개 정류장에서 도보 30분 소요',
    '간월재이륙장': '배내2공영주차장에 주차 후 도보 이동 (주차장 협소 => 갓길에 주차해야될 확률 높음) -> 도보 1시간 30분-2시간 정도 소요 간월산장주차장에 주차 후 도보 이동(40분 소요) 대중교통 이용시 1) 주암마을입구 정류장에서 도보 1시간 30분-2시간 정도 소요 2) 복합센터 정류장에서 도보 50분 소요',
    '고헌산(곰돌이)이륙장': '고헌산곰돌이활공장까지 차로 이동 가능, 도로가 좁아서 비추.. 고헌산 주차장에서 도보로 1시간 10분 소요 대중교통 이용시 1) 상차리 정류장에서 도보 1시간 소요 2) 대곡 정류자에서 도보 40분 소요 3) 옥천당 정류장에서 도보 1시간 10분 소요',
    '연화산이륙장': '연화산 이륙장까지 차타고 이동 가능, 도로가 좁음 타 지역에서 차를 타고 왔을 경우 울산대곡박물관 주차장(무료)에 주차 후 도보 2시간~2시간 30분 대중교통을 이용할 경우 1) 대곡박물관 정류장에 도착했을 때 도보 2시간~2시간 30분 2) 신기 정류장에 도착했을 때 도보 2시간',
    '대니산이륙장': 'https://m.blog.naver.com/elion68/221288269893 차타고 이동 가능, 활공장 뒤에 조그마한 공간이 있어서 주차할 수 있긴함 근데 올라가는 길이 좁아 차 타고 올라가는데 불편할 수 있음 바이크 혹은 자전거를 타고 올라가는 것도 추천 대중교통을 이용할 경우 -> 대구 소프트웨어 마이스터고등학교앞 정류장 혹은 국가산단반도유보라3차 앞 정류장에 도착했을 때 도보 30분 소요',
    '계룡산이륙장': '내비에 계룡산 포로수용소유적지분기점찍고 차를 타고 오다보면 거의 다 왔을때 활공장을 볼 수 있음 대중교통을 이용할 경우 포스코입구 정류장, 정다운약국 정류장에서 도보 30분',
    '망실봉이륙장': '한국승강기대학교주차장에 차를 두고 도보 이동(1시간-1시간 30분 소요) 대중교통 이용시 1) 한국승강기대학교정류장, 장팔 정류장, 상고창 정류장에서 도보 40분 소요 2) 덕산 정류장에서 도보 30분 소요 3) 소곡 정류장에서 도보 1시간 소요',
    '감악산이륙장': '주차장(경남 거창군 남상면 무촌리)에 주차 후 도보 15분 대중교통을 이용할 경우 1) 청연 정류장에 도착했을 때 도보 30~40분 2) 청용 정류장, 내동 정류장에서 도보 1시간 10분 3) 명산동 정류장에서 도보 1시간 20분 소요',
    '무척산이륙장': '무척산주차장입구에서 도보 이동 대중교통 이용시 무척산 입구 정류장에서 도보 이동 이륙장으로 가는길이 등산로에 표시가 되어 있지 않고 이정표로 나타내주지 않아서 찾아가기가 힘들기 때문에 꼭 밑에 유튜브 영상을 보면서 가는걸 추천!!!! https://youtu.be/RFD0yLf6ioQ?si=qunfxtwXriIXlJYd',
    '진례이륙장': '내비에 경남 김해시 진례면 신안리 산 159 입력 후 차로(도로가 좁음) 버스정류장과 지하철역 모두 이륙장과 거리가 멀어 대중교통 비추',
    '봉화산이륙장': '',
    '망운산이륙장': '내비에 KBS망운산송신소를 입력하고 오면 된다. 송신소에 도착했을때 길따라 조금만 더 가면 활공장이 나온다. 대중교통을 이용할 경우 1) 중리 정류장에 도착했을때 도보 1시간 2) 서상마을앞 정류장에 도착했을때 도보 1시간 20분 3) 효자문삼거리 정류장에서 도보 1시간 30분 4) 작장 정류소에서 도보 1시간 소요',
    '바람재이륙장': '출입금지 푯말이 세워져 있어 혼자 가면 이륙장에 들어가지 못하고 담당 공무원분이 열어주셔야 입장 가능 상의 필요',
    '음달산이륙장': '국도 58호선을 타고 오다가 길에 주차를 하고 도로 옆 샛길로 조금 걸어가면 됨(사진참조) 대중교통 이용해서 찾아가는 불가',
    '발례이륙장': '차 이용 1) 사진참조(사람들이 거의 이용하지 않음 -> 이용 비추) 2) 정승골돌탑쉼터 근처 길에 차를 대고 도보 이동(30분 소요) 대중교통을 이용할 경우 1) 임고정 정류장에 도착했을때 도보 1시간 소요 2) 동화 정류장에 도착했을때 도보 2시간 3) 아불 정류장에 도착했을때 도보 1시간 30분 4) 남명 정류장에 도착했을때 도보 1시간 50분 5) 원서 정류장에 도착했을때 도보 1시간 40',
    '남포이륙장': '주변에 주차할곳이 마땅하지 않음 도보 이동 추천(사진 참조) 대중교통을 이용할 경우 1) 멍에실종점 정류장에서 도보 이동 2) 남포리 정류장에서 도보 이동 3) 밀양역 근처 정류장들(매우 많음)에서 도보 이동',
    '와룡산이륙장': 'X찬곳에 주차가능함(주차장 매우 협소) -> 길따라 걸어 올라감(도보 20분) 대중교통을 이용할 경우, 용두 정류장에 도착했을때 도보 20분',
    '각산이륙장': '주변 주차장 없음 -> 자동차 이용 비추 대중교통 이용시 1) 광포 정류장에서 도보 1시간 10분 소요 2) 송포 입구 정류장에서 도보 1시간 소요 3) 삼천포시외버스터미널 정류장에서 50분 소요',
    '특리이륙장': '산청군 금서면 신아리 129-1의 태양열 발전소의 옆 삼거리에서 산쪽의 임도를 약 2km 가량 오르면 봉수대 부근에서 갈림길이 보이는데 오른쪽으로 약 200m 걸어가면된다.(도보 약 30분) 동의보감촌 주차장(무료)에 주차 후 도보 40분 이동 대중교통을 이용할 경우 동의보감촌 정류장에서 도보 40분 이동',
    '한우산이륙장': '한우산 주차장에 주차 후 도보 이동(약 5분 소요) 대중교통 이용시, 벽계 정류장, 내초 정류장에서 도보 이동',
    '형제봉이륙장': '약양면  무료공영 주차장에 주차 후 도보 이동(1시간 50분 소요) 대중교통 이용시 1) 악양면 정류장에서 도보 이동(1시간 50분 소요) 2) 중기 정류장에서 도보 이동(1시간 소요)',
    '자양산이륙장': '자양산 중개소(경남 함안군 산인면 부봉리 산97-2)를 찍고 타를 타고 올라가다가 거의 다 왔을때쯤 왼쪽에 데크가 있을것이다 거기에 차를 대고 난 후 오른쪽에 있는 이정표를 따라 100m를 가면 자양산 정상인데 활공장으로도 이용한다 대중교통을 이용할 경우 1) 장암 정류장에서 도보 1시간 이동 2) 대천마을 정류장에서 도보 50분 이동',
    '대암산이륙장': '내비에 대암산을 입력하고 가다보면 거의 다 와서 주차할 수 있는 공간이 있다. 거기에 주차 후 도보 이동(약 10~15분 소요) 대중교통 이용시 1) 본원당 정류장에서 도보 1시간 10분 소요 2) 무곡 정류장에서 도보 1시간 20분 소요',
    '벽도산이륙장': '1) 두대리 마을회관에서 도보이동: https://blog.naver.com/bds6546/223375090982 2) 경상북도 경주시 내외로 3152에서 도보이동: https://www.youtube.com/watch?v=yexAGwsrgyM 3) 내비에 벽도산을 입력해 차를 타고 오면 방송 송신탑이 있는데 그 옆에 비포장 도로길을 따라 조금 걸으면 활공장이 나옴 대중교통을 이용할 경우 1) 뒤들 정류장에서 도보 50분 소요 2) 윗마을 정류장 -> 내외로 3152로 -> 위2번 대로 이동',
    '국당이륙장': '차로 가는길은 사진 참고 대중교통 이용시, 국당 정류장에서 도보 이동(약 40분 소요)',
    '문경활공랜드': '주변 주차장X -> 자동차 이용 비추 모노레일 타고 올라갈 수 있음 대중교통 이용시, 동우점 정류장에서 도보 이동(1시간 30분 소요)',
    '황금산이륙장': '덕암산 정상(경북 예천군 풍양면 고산리 산 32)까지 자동차가 올라 올 수는 있으나 도로가 좁음 대중교통 이용시 1) 매골 정류장에서 도보 1시간 소요 2) 효갈2리 정류장에서 도보 1시간 소요',
    '안동길안이륙장': 'https://cafe.daum.net/paranalmeng2/81CI/959?q=%EC%95%88%EB%8F%99%20%EA%B8%B8%EC%95%88%EC%9D%B4%EB%A5%99%EC%9E%A5 사진참조 대중교통 이용시 1) 천지2리.산하리 정류장에서 도보 40분 소요 2) 용계은행나무 정류장에서 도보 50분 수요',
    '방광산이륙장': '청송읍사무소 주차장(무료)에 주차 후 도보 이동 대중교통 이용시 청송터미널 정류장에서 도보 이동',
    '칠포이륙장': '곤륜산 주차장에 주차 후 도보 이동 대중교통 이용시, 칠포 삼거리 정류장에서 도보 이동',
    '노안이륙장': '불교사(광주 광산구 삼도봉학길 240)까지 차를 타고 이동 -> 절 앞에 주차 -> 왼쪽에 좁은 길으로 5분정도 걸어서 올라가면됨 대중교통 이용시 1) 망월(쌍내입구) 정류장에서 도보 이동(40분 소요) 2) 송학입구 정류장에서 도보 이동(30분 소요)',
    '주작산이륙장': '주차장에 주차 후 도보 이동(40~ 50분 소요) 대중교통 이용시, 백용마을 정류장에서 도보 이동(30분 소요)',
    '호락산이륙장': '내비에 최씨네개똥숙을 치고 온다 -> 옆에 갓길에 주차를 한다 -> 최씨네개똥숙 옆길을 따라 걸어올라간다(주변에 주차장X) 대중교통 이용시, 고달리 정류장, 수월리 정류장에서 도보 이동(30분 소요)',
    '오봉대이륙장': '주변 주차장X -> 자동차 이용 비추 대중교통 이용시, 덕산 정류장에서 도보 이동(30분 소요)',
    '오산이륙장': '사성암 입구 주차장에 주차 후 도보 이동 대중교통 이용시, 사성암 정류장에서 도보 이동(40~50분 소요)',
    '광의이륙장': '주변 주차장X -> 자동차 이용 비추 대중교통 이용시 1) 탑동 정류장에서 도보 이동(1시간 10분 소요) 2) 온동 정류장에서 도보 이동(40분 소요)',
    '창평이륙장': '주변 주차장X -> 자동차 이용 비추 대중교통 이용시, 용수리 정류장에서 도보 이동',
    '주월산이륙장': '주월산 정상에 주차공간이 있음 주차 후 도보 이동 (대중교통 이용 불편 -> 이용 비추)',
    '재석산이륙장': '주변 주차장X -> 자동차 이용 비추 대중교통 이용시 1) 낙안, 구기 정류장 도보 이동(40분 소요) 2) 홍교다리 정류장 도보 이동(70분 소요) 3) 벌교터미널 정류장 도보 이동(1시간 소요) 4) 고정 정류장에서 도보 이동(50분 소요)',
    '장등산이륙장': '주변 주차장X -> 자동차 이용 비추 대중교통 이용시, 여수요양병원 정류장에서 도보 이동(약 30분 소요)',
    '마래산이륙장': '주변 주차장X -> 자동차 이용 비추 대중교통 이용시, 성학맨션정류장, 힐스테이트 2단지아파트, 와이오션관광호텔 정류장에서 도보 이동(30분 소요)',
    '장암산활공장': '주변에 주차장XX -> 자동차 이동 비추 대중교통 이용시 1) 월암리 정류장에서 도보 이동(40분 소요) 2) 석적 정류장에서 도보 이동(330분 소요)',
    '사자산이륙장': '제암산철쭉평원 주차장 혹은 제암산자연휴양림 주차장에 주차 후 도보 이동 대중교통 이용 시 1) 깊은골마을 도보 이동 2) 기산마을 정류장에서 도보 40분 소요',
    '달마산이륙장': '도솔암 주차장에서 도보 이동(150m) 대중교통 이용시, 마련 정류장에서 도보 이동(50분 소요)',
    '화순이륙장': '활공장 근처 주차공간 있음 대중교통 이용시, 큰재 정류장에서 도보 이동(10분 이내)',
    '방장산이륙장': '국립방장산자연휴양림주차장에 주차 후 도보 이동 대중교통 이용시 청운 정류장에서 도보 이동(40분 소요)',
    '오성산이륙장': '주변에 주차장XX -> 자동차 이동 비추 대중교통 이용시 1) 항동 정류장에서 도보 이동(20분 소요) 2) 상흥마을 정류장, 군장대학교 정류장, 수심 정류장에서 도보 이동(30분 소요) 3) 대동 정류장에서 도보 이동(40분 소요)',
    '무주이륙장': '주변에 주차장XX -> 자동차 이동 비추 대중교통 이용시, 밤숙골 정류장에서 도보 이동(30분 소요)',
    '향적봉이륙장': '덕유산국립공원 삼공주차장에 주차 후 도보 이동(사진 참조) 대중교통 이용시 1) 구천동 버스 승강장에서 도보 이동(2시간 소요) 2) 통안 정류장에서 도보 이동(2시간 20분 소요) 3) 덕유산 국립공원 정류장에서 도보 이동(2시간 소요)',
    '미륵산이륙장': '삼곡사 주차장에 주차 후 도보 이동(20분 소요) 대중교통 이용시, 대파니 정류장에서 도보 이동(30분 소요)',
    '논개이륙장': '신덕산 마을회관 근처 주차장에 주차 후 도보이동(20분 소요) 대중교통 이용시, 덕산 정류장에서 도보 이동(20분 소요)',
    '경각산이륙장': '주변에 주차장XX -> 자동차 이동 비추 대중교통 이용시 , 불재 정류장에서 도보 이동',
    '고근산이륙장': '고근산 주차장에 주차 후 도보 이동(10분 소요) 대중교통 이용시, 고근산 정류장에서 도보 이동(20분 소요)',
    '제주시서우봉 이륙장': '서우봉 주차장(제주특별자치도 제주시 조천읍 함덕리 250-2)에 주차후 도보 이동 10~20분 소요 대중교통을 이용할 경우 911의원 정류장에서 도보 20~30분 소요',
    '월랑봉이륙장': '대중교통 이용시 1) 손지오름 정류장에서 도보 이동(40분 소요) 2) 다랑쉬오름 입구(북) 정류장에서 도보 이동(30분 소요)',
    '새별오름이륙장': '새별오름주차장에 주차 후 도보이동(10분 소요) 대중교통 이동시 새별오름 정류장에서 도보 이동(20분 소요)',
    '금악오름이륙장': '금오름 주차장에 주차 후 도보 이동(15분 소요) 대중교통을 이용할경우, 금오름 정류장에서 도보로 약 20분 소요'
  };

  useEffect(() => {
    if (route.params?.selectedFactory) {
      setSelectedFactories(prev => [...prev, route.params.selectedFactory]);
    }
  }, [route.params?.selectedFactory]);

  const handleFactoryPress = (factoryName) => {
    const region = route.params?.region;
    navigation.navigate('Home', { selectedFactory: factoryName, region: region });
  };

  const getImageSource = (factoryName) => {
    const images = {
      '각산이륙장': require('../assets/GakSanTakeOff.png'),
      '간월재이륙장': require('../assets/GanWolJaeTakeOff.png'),
      '감악산이륙장': require('../assets/GamakSanTakeOff.png'),
      '경각산이륙장': require('../assets/GyeongGakSanTakeOff.png'),
      '계룡산이륙장': require('../assets/GyeRyeongSanTakeOff.png'),
      '고근산이륙장': require('../assets/GoGeunSanTakeOff.png'),
      '고헌산(곰돌이)이륙장': require('../assets/GoHeonSanGomDoliTakeOff.png'),
      '관모산이륙장': require('../assets/GwanMoSanTakeOff.png'),
      '광교산이륙장': require('../assets/GwangGyoSanTakeOff.png'),
      '광의이륙장': require('../assets/GwangUiTakeOff.png'),
      '괘방산활공장': require('../assets/GwaeBangSanTakeOff.png'),
      '국당이륙장': require('../assets/GukDangTakeOff.png'),
      '금악오름이륙장': require('../assets/GeumOReumTakeOff.png'),
      '기룡산이륙장': require('../assets/GiRyeongSanTakeOff.png'),
      '남산이륙장': require('../assets/NamSanTakeOff.png'),
      '남포이륙장': require('../assets/NamPoTakeOff.png'),
      '노안이륙장': require('../assets/NoAnTakeOff.png'),
      '논개이륙장': require('../assets/NonGaeTakeOff.png'),
      '달마산이륙장': require('../assets/DalMaSanTakeOff.png'),
      '대관령활공장': require('../assets/DaeGwanRyeongTakeOff.png'),
      '대니산이륙장': require('../assets/DaeNiSanTakeOff.png'),
      '대룡산이륙장': require('../assets/DaeReungSanTakeOff.png'),
      '대부도구봉산이륙장': require('../assets/DaeBuDoGuBongSanTakeOff.png'),
      '대암산이륙장': require('../assets/DaeAmSanTakeOff.png'),
      '덕기봉이륙장': require('../assets/DeokGiBongTakeOff.png'),
      '도비산활공장': require('../assets/DoBiSanTakeOff.png'),
      '두산활공장': require('../assets/DuSanTakeOff.png'),
      '마래산이륙장': require('../assets/MaRaeSanTakeOff.png'),
      '망실봉이륙장': require('../assets/MangSilBongTakeOff.png'),
      '망운산이륙장': require('../assets/MangUnSanTakeOff.png'),
      '매산리활공장': require('../assets/MaeSanRiTakeOff.png'),
      '무릉활공장': require('../assets/MuReungTakeOff.png'),
      '무주이륙장': require('../assets/MuJuTakeOff.png'),
      '무척산이륙장': require('../assets/MuCheokSanTakeOff.png'),
      '문경활공랜드': require('../assets/MunGyeongTakeOff.png'),
      '미륵산이륙장': require('../assets/MiReukSanTakeOff.png'),
      '미시령이륙장': require('../assets/MiSiRyeongTakeOff.png'),
      '바람재이륙장': require('../assets/BaRamJaeTakeOff.png'),
      '박달산이륙장': require('../assets/BakDalSanTakeOff.png'),
      '발례이륙장': require('../assets/BalRyeTakeOff.png'),
      '방광산이륙장': require('../assets/BangGwangSanTakeOff.png'),
      '방장산이륙장': require('../assets/BangJangSanTakeOff.png'),
      '백월산이륙장': require('../assets/BaekWolSanTakeOff.png'),
      '백화산이륙장': require('../assets/BaekHwaSanTakeOff.png'),
      '벽도산이륙장': require('../assets/ByeokDoSanTakeOff.png'),
      '봉래산이륙장': require('../assets/BongRaeSanTakeOff.png'),
      '봉수대이륙장': require('../assets/BongSuDaeTakeOff.png'),
      '봉화산(당진)이륙장': require('../assets/BongHwaSanTakeOff.png'),
      '불탄산이륙장': require('../assets/BulTanSanTakeOff.png'),
      '사곡이륙장': require('../assets/SaGokTakeOff.png'),
      '사명산이륙장': require('../assets/SaMyeongSanTakeOff.png'),
      '사자산이륙장': require('../assets/SaJaSanTakeOff.png'),
      '서독산활공장': require('../assets/SeoDokSanTakeOff.png'),
      '제주시서우봉이륙장': require('../assets/SeoUBongTakeOff.png'),
      '서운산이륙장': require('../assets/SeoUnSanTakeOff.png'),
      '송라산활공장': require('../assets/SongRaSanTakeOff.png'),
      '식장산이륙장': require('../assets/SikJangSanTakeOff.png'),
      '안동길안이륙장': require('../assets/AnDongGilAnTakeOff.png'),
      '양백산이륙장': require('../assets/YangBaekSanTakeOff.png'),
      '어섬활공장': require('../assets/EOSeomTakeOff.png'),
      '연화산이륙장': require('../assets/YeonHwaSanTakeOff.png'),
      '예봉산이륙장': require('../assets/YeBongSanTakeOff.png'),
      '오봉대이륙장': require('../assets/OBongSanTakeOff.png'),
      '오산이륙장': require('../assets/OSanTakeOff.png'),
      '오서산활공장': require('../assets/OSeoSanTakeOff.png'),
      '오성산이륙장': require('../assets/OSungSanTakeOff.png'),
      '와룡산이륙장': require('../assets/WaRyeongSanTakeOff.png'),
      '와우정사활공장': require('../assets/WaUJeongSaTakeOff.png'),
      '왜목활공장': require('../assets/WaeMokTakeOff.png'),
      '원적산이륙장': require('../assets/WonJeokSanTakeOff.png'),
      '월랑봉이륙장': require('../assets/WolRangBongTakeOff.png'),
      '유명산이륙장': require('../assets/YuMyeongSanTakeOff.png'),
      '은봉산이륙장': require('../assets/EunBongSanTakeOff.png'),
      '음달산이륙장': require('../assets/EumDalSanTakeOff.png'),
      '자양산이륙장': require('../assets/JaYangSanTakeOff.png'),
      '장등산이륙장': require('../assets/JangDongSanTakeOff.png'),
      '장암산활공장': require('../assets/JangAmSanTakeOff.png'),
      '재석산이륙장': require('../assets/JaeSeokSanTakeOff.png'),
      '정광산이륙장': require('../assets/JeongGwangSanTakeOff.png'),
      '주월산이륙장': require('../assets/JuWolSanTakeOff.png'),
      '주작산이륙장': require('../assets/JuJakSanTakeOff.png'),
      '진례이륙장': require('../assets/JinRyeTakeOff.png'),
      '진천활공장': require('../assets/JinCheonTakeOff.png'),
      '창평이륙장': require('../assets/ChangPyeongTakeOff.png'),
      '초록봉활공장': require('../assets/ChoRokBongTakeOff.png'),
      '칠포이륙장': require('../assets/ChilPoTakeOff.png'),
      '특리이륙장': require('../assets/TeukRiTakeOff.png'),
      '한우산이륙장': require('../assets/HanUSanTakeOff.png'),
      '향적봉이륙장': require('../assets/HyangJeokBongTakeOff.png'),
      '형제봉이륙장': require('../assets/HyeongJeBongTakeOff.png'),
      '혜음령이륙장': require('../assets/HyeEumRyeongTakeOff.png'),
      '호락산이륙장': require('../assets/HoRakSanTakeOff.png'),
      '화순이륙장': require('../assets/HwaSunTakeOff.png'),
      '황금산이륙장': require('../assets/HwangGeumSanTakeOff.png'),
      '황령산이륙장': require('../assets/HwangRyeongSanTakeOff.png'),
      '혹성산이륙장': require('../assets/HokSeongSanTakeOff.png')
    };
    return images[factoryName] || require('../assets/default.png');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.selectedFactoryContainer}>
        <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('SelectBowFactoryScreen')}>
          <Text style={styles.buttonText}>활공장 선택</Text>
        </TouchableOpacity>
      </View>
      {selectedFactories.map((factoryName, index) => (
        <TouchableOpacity key={index} onPress={() => handleFactoryPress(factoryName)}>
          <View style={styles.detailsContainer}>
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>{factoryName}</Text>
              <Image source={getImageSource(factoryName)} style={styles.factoryImage} />  
              <Text style={styles.summaryText}>{summaryData[factoryName]}</Text>
              
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  selectedFactoryContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginTop: 10,
  },
  factoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  }
});