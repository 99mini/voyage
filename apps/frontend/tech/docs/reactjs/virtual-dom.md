---
sidebar_position: 2
slug: virtual-dom
title: 'Virtual DOM (with React)'
authors: [99mini]
tags: [javascript, react]
date: 2025-07-22
---

Virtual DOM이란? (with React)

<!-- truncate -->

## DOM(Document Object Model)이란?

> 문서 객체 모델(DOM)은 웹 페이지를 스크립트 또는 프로그래밍 언어와 연결합니다. 이는 문서의 구조(예: 웹 페이지를 나타내는 HTML)를 메모리에 표현함으로써 이루어집니다. 일반적으로 JavaScript를 지칭하지만, HTML, SVG, 또는 XML 문서를 객체로 모델링하는 것은 핵심 JavaScript 언어의 일부가 아닙니다. [[1]](#mdn-web-docs)

DOM 문서는 논리적으로 트리 형태를 가지며 각 노드는 객체를 포함합니다.

## Virtual DOM이란?

Virtual DOM(가상 DOM)은 UI 업데이트의 효율성을 극대화하기 위해 실제 DOM(Document Object Model)의 가벼운 복사본을 메모리 상에서 유지 관리하는 기술입니다. DOM 조작이 느린 브라우저 환경에서 성능을 개선하는 데 중요한 역할을 수행합니다. [[2]](#react와-춤을)
UI의 이상적인 또는 **“가상”** 적인 표현을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 **“실제”** DOM과 동기화하는 프로그래밍 개념입니다. 이 과정을 *재조정*이라고 합니다. [[3]](#react공식문서-virtual-dom과-internals)

## Virtual DOM의 동작 방식

1. Virtual DOM 생성
   - React 컴포넌트가 렌더링되면 가상 DOM 트리가 생성됩니다. 이는 실제 DOM 구조를 메모리 내에서 나타낸 가벼운 객체입니다.
2. 변경사항 감지
   - 애플리케이션 상태가 변경되면 React는 새로운 가상 DOM을 생성하고 이전 가상 DOM과 비교합니다. 이를 **"디프(diffing)"** 과정이라고 합니다.
3. 최소한의 업데이트 계산
   - 비교 결과를 바탕으로 실제 DOM에서 변경이 필요한 부분만 추적하고 업데이트합니다. 이 과정에서 **"패치(patching)"** 가 이루어집니다.
4. 실제 DOM 업데이트
   - 변경된 부분만 실제 DOM에 적용하여 브라우저가 화면을 다시 그리도록 합니다. [[2]](#react와-춤을)

## Virtual DOM의 특징

1. 성능 최적화
   - 직접적으로 DOM을 조작하는 작업은 느리고 리소스를 많이 소모합니다.
   - Virtual DOM은 변경된 부분만 실제 DOM에 반영하여 DOM 조작의 오버헤드를 줄입니다.
2. 효율적인 렌더링
   - 모든 상태 변화가 새로운 가상 DOM을 생성하고 비교하더라도 이는 메모리에서 이루어지는 작업이므로 속도가 빠릅니다.
3. 브라우저 호환성
   - Virtual DOM은 브라우저 독립적입니다.
   - React는 Virtual DOM을 통해 여러 브라우저 환경에서도 일관된 동작을 제공합니다.
4. 코드 간결성
   - 개발자는 DOM 조작에 직접 신경 쓰지 않아도 됩니다.
   - React가 Virtual DOM을 통해 상태 변화와 UI 업데이트를 관리합니다. [[2]](#react와-춤을)

**DOM 조작에서 비용이 많이 발생하는 화면 업데이트(레이아웃 혹은 리플로우 -> painting) 과정**에서 **Batch Update**를 통해 효율적으로 업데이트 가능합니다. [[4]](#virtual-dom-react-핵심정리)

> Batch Update: 여러 상태 변화를 일괄 처리하여 DOM 업데이트를 최적화하는 기술

## Virtual DOM이 느릴 수 있는 경우

1. 초기화 및 비교 비용
   - 가상 DOM을 생성하고 비교하는 과정은 메모리 및 계산 비용이 필요합니다. 특히, 변경 사항이 많지 않은 경우에는 오히려 직접 DOM 조작보다 느릴 수 있습니다.
2. 상태 관리 오버헤드
   - 가상 DOM은 상태 변화를 감지하고 업데이트하는 과정에서 추가적인 오버헤드를 발생시킬 수 있습니다.
3. 특정 상황
   - 아주 간단한 UI 변경이나, 초기 렌더링 시에는 직접 DOM 조작이 더 빠를 수 있습니다.

## Reference

1. ###### [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model)
2. ###### [React와 춤을](https://wikidocs.net/273873)
3. ###### [React 공식 문서 - Virtual DOM과 Internals](https://ko.legacy.reactjs.org/docs/faq-internals.html)
4. ###### [Virtual DOM (React) 핵심정리](https://callmedevmomo.medium.com/virtual-dom-react-%ED%95%B5%EC%8B%AC%EC%A0%95%EB%A6%AC-bfbfcecc4fbb)
