---
sidebar_position: 1
slug: encoding
title: '인코딩'
authors: [99mini]
tags: [웹, encoding]
date: 2025-07-27
---

인코딩 방식 (UTF-8, UTF-16)

<!--truncate-->

## UTF-8

UTF-8(UCS Transformation Format 8)은 월드 와이드 웹의 가장 일반적인 문자 인코딩입니다. 각 문자는 1~4바이트로 표시됩니다. UTF-8은 ASCII와 역호환되며 표준 유니코드 문자를 나타낼 수 있습니다.

처음 128개의 UTF-8 문자는 처음 128개의 ASCII 문자(숫자 0-127)와 정확히 일치하며, 이는 기존 ASCII 텍스트가 이미 유효한 UTF-8임을 의미합니다. 다른 모든 문자는 2~4바이트를 사용합니다. 각각의 바이트는 인코딩 목적으로 남겨진 비트가 있습니다. 비 ASCII 문자가 저장을 위해 1 바이트 이상을 요구하기 때문에, 바이트가 분리되고 재결합되지 않은 상태로 실행하면 손상될 위험이 있습니다. [[1]](#1-mdn---glossaryutf-8)

## Reference

- ##### [1] [MDN - Glossary/UTF-8](https://developer.mozilla.org/ko/docs/Glossary/UTF-8)
