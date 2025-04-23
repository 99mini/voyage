---
sidebar_position: 1
slug: network-OSI-7-layer
title: '[네트워크] OSI 7 계층'
authors: [99mini]
tags: [네트워크]
---

[네트워크] OSI 7 계층

<!-- truncate -->

### OSI 7 계층 개념

| layer | name                | protocol                  |
| ----- | ------------------- | ------------------------- |
| 7     | Application 응용    | HTTP, SMTP, FTP, NFS      |
| 6     | Presentation 표현   | JPEG, MPEG, CDR, SMB, AFP |
| 5     | Session 세션        | TLS, SSH, ISO, RPC        |
| 4     | Transport 전송      | TCP, UDP                  |
| 3     | Network 네트워크    | IP, ICMP, ARP             |
| 2     | DataLink 데이터링크 | Ehternet, ATM, LAN, Wifi  |
| 1     | Physical 물리       | Modem, Cable, Fiber       |

1. 물리 계층 (Physical Layer)

   - 실제 전기적/기계적 신호를 전송
   - 케이블, 리피터, 허브 등 포함

2. 데이터 링크 계층 (Data Link Layer)

   - 오류 검출과 흐름 제어
   - MAC 주소 기반 전송, 프레임 단위

3. 네트워크 계층 (Network Layer)

   - IP 주소 기반의 논리적 경로 설정 (라우팅)
   - 데이터그램 전송

4. 전송 계층 (Transport Layer)

   - 종단 간 연결 설정 및 신뢰성 보장
   - TCP(신뢰성), UDP(속도)

5. 세션 계층 (Session Layer)

   - 세션 생성, 유지, 종료
   - 연결된 장치 간의 대화 제어

6. 표현 계층 (Presentation Layer)

   - 데이터 포맷(인코딩, 암호화 등) 변환
   - 예: JPEG 압축, TLS 암호화

7. 응용 계층 (Application Layer)
   - 사용자와 직접 인터페이스하는 소프트웨어
   - 웹 브라우저, 이메일 클라이언트 등

### 네트워크 프로토콜

- ICMP: Internet Control Message Protocol

  - IP의 동작 과정에서 전송 오류가 발생하는 경우에 대비해 오류 정보를 전송
  - 예(`ping`)

- TCP 헤더

  - 순서 번호(Sequence Number): 전달하는 바이트마다 번호 부여
  - 수신 번호 확인(Acknowledgment Number): 전송한 바이트를 수신자에게 전달
  - 체크섬(Checksum): 데이터를 포함한 세그먼트의 오류 검사
  - 윈도우 크기: 송수신 측의 버퍼 크기(최대 $2^{16} - 1$byte)

- ARP (Address Resolution Protocol)

  - 논리 주소를 물리 주소로 변환시켜주는 프로토콜

#### IPv4 & IPv6

**IPv4**

- 32bit, 4byte

**IPv6**

- 패킷 헤더 40 octect
- 128bit, 16byte,
- 유니캐스트, 멀티캐스트, 애니케스트
  - 애니캐스트: 하나의 호스트에서 그룹 내의 가장 가까운 곳에 있는 수신자에게 전달
- 보안과 인증 확장 헤더 -> 인터넷 계층 보안기능 강화
