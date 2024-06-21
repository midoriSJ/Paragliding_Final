CREATE TABLE weather_data(
    factoryName varchar(50) primary key,
    region varchar(30) not null,
    weather varchar(100) not null,
    temperature float not null,
    wind_speed float not null
)

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(30) NOT NULL,
    birthdate DATE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE launch_sites (
    siteNo int auto_increment PRIMARY KEY,
    siteName VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL
);

-- posts 테이블 생성
CREATE TABLE posts (
    postNum INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(255),
    board VARCHAR(255) NOT NULL DEFAULT '자유게시판',
    FOREIGN KEY (username) REFERENCES users(username)
);

-- comments 테이블 생성
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postNum INT,
    author_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postNum) REFERENCES posts(postNum) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

이렇게 테이블을 5개 생성해주시고
INSERT INTO launch_sites (siteNo, siteName) VALUES (1, "각산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (2, "간월재이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (3, "감악산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (4, "경각산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (5, "계룡산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (6, "고근산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (7, "고헌산(곰돌이)이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (8, "관모산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (9, "광교산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (10, "광의이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (11, "괘방산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (12, "국당이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (13, "금오름이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (14, "기룡산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (15, "남산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (16, "남포이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (17, "노안이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (18, "논개이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (19, "달마산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (20, "대관령활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (21, "대니산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (22, "대릉산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (23, "대부도구봉산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (24, "대암산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (25, "덕기봉이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (26, "도비산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (27, "두산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (28, "마래산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (29, "망실봉이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (30, "망운산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (31, "매산리활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (32, "무릉활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (33, "무주이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (34, "무척산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (35, "문경활공랜드");
INSERT INTO launch_sites (siteNo, siteName) VALUES (36, "미륵산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (37, "미시령활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (38, "바람재이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (39, "박달산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (40, "발례이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (41, "방광산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (42, "방장산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (43, "백월산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (44, "백화산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (45, "벽도산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (46, "봉래산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (47, "봉수대이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (48, "봉화산(당진)활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (49, "봉화산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (50, "불탄산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (51, "사곡이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (52, "사명산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (53, "사자산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (54, "새별오름이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (55, "서독산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (56, "서우봉이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (57, "서운산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (58, "송라산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (59, "식장산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (60, "안동길안이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (61, "양백산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (62, "어섬활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (63, "연화산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (64, "예봉산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (65, "오봉산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (66, "오산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (67, "오서산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (68, "오성산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (69, "와룡산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (70, "와우정사활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (71, "왜목활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (72, "원적산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (73, "월랑봉이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (74, "유명산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (75, "은봉산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (76, "음달산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (77, "자양산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (78, "장동산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (79, "장암산활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (80, "장암산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (81, "재석산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (82, "정광산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (83, "주월산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (84, "주작산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (85, "진례이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (86, "진천활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (87, "창평이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (88, "초록봉활공장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (89, "칠포이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (90, "특리이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (91, "한우산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (92, "향적봉이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (93, "형제봉이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (94, "혜음령이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (95, "호락산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (96, "화순이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (97, "황금산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (98, "황령산이륙장");
INSERT INTO launch_sites (siteNo, siteName) VALUES (99, "혹성산이륙장");

이렇게 활공장 정보만 기본적으로 입력해주시면 프로그램 실행을 위한 데이터베이스 구축은 끝입니다.
