---
created: <% tp.file.creation_date() %>
date: <%* const dates = tp.user.calendar.getAdjacentDates(tp.user.calendar.pathToDate(tp.file.path())); %><% tp.user.calendar.formatIsoDate(dates.today) %>
tags:
  - dag
---

# <% tp.user.calendar.formatReadableDate(dates.today) %>

## Agenda

## Oppsummering av dagen

[← I går](<2 Kalender/<% tp.user.calendar.dateToPath(dates.yesterday) %>>) | [I morgen →](<2 Kalender/<% tp.user.calendar.dateToPath(dates.tomorrow) %>>)
