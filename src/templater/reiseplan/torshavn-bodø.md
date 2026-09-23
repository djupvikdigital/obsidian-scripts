---
created: <% tp.file.creation_date() %>
date: <%* const dates = tp.user.calendar.pathToDates(tp.file.path()); %><% tp.user.calendar.formatIsoDate(dates.today) %>
tags:
  - reiseplan
---
# Reiseplan <% tp.user.calendar.formatReadableDate(dates.today) %>

1. Gå hjemmefra **00:00**
2. Buss 300 til flyplassen, avgang **00:00** fra fergeterminalen, ankomst **00:00**, gå på ved Mannbrekka
3. Atlantic Airways flight RCxxx til Gardermoen, avgang fra Vágar **00:00**, ankomst **00:00**, referansenr. **x**
4. Norwegian flight DYxx til Bodø, avgang fra Gardermoen **00:00**, ankomst **00:00**, referansenr. **x**