// #import "@preview/touying:0.6.1": *
// #import themes.aqua: *
#import "config/metadata.typ": *
#import "themes/aqua.typ": *

#show: aqua-theme.with(
  aspect-ratio: "16-9",
  config-info(
    title: [BÁO CÁO ĐỒ ÁN],
    subtitle: [HỆ THỐNG QUẢN LÝ ĐẶT PHÒNG],
    author: [NHÓM 02],
    date: "Tháng 01, 2026",
    institution: [TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN],
  ),
)

// Set font
#set text(font: "Montserrat", weight: "light")

#title-slide()

#include "content/outline.typ"

// #outline-slide()

// = The Section

// == Slide Title

// #lorem(40)

// #focus-slide[
//   Another variant with primary color in background...
// ]

// == Summary

// #slide(self => [
//   #align(center + horizon)[
//     #set text(size: 3em, weight: "bold", fill: self.colors.primary)
//     THANKS FOR ALL
//   ]
// ])
