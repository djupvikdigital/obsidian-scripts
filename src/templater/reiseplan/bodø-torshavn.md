---
created: <% tp.file.creation_date() %>
date: <%* const dates = tp.user.calendar.pathToDates(tp.file.path()); %><% tp.user.calendar.formatIsoDate(dates.today) %>
tags:
  - reiseplan
---
# Reiseplan <% tp.user.calendar.formatReadableDate(dates.today) %>

1. Norwegian flight DYxxx til Gardermoen, avreise **00:00** fra Bodø, ankomst **00:00**, referansenummer **x**
2. Atlantic flight RCxxx til Vágar, avreise **00:00** fra Gardermoen, ankomst **00:00**, referansenummer **x**
3. Buss 350 til byen, avreise **13:30** fra flyplassen, ankomst busstasjonen **14:30**