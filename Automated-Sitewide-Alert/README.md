# Automated Sitewide Alert

Once was a manual process, but is now completely automated. Lightweight script that will display high-priority alerts from a third-party system across a website. "High-priority" events include dangerous or life-threatening scenarios that are imminent.

A brief message is displayed, along with a link for more information.

## Environment & Process

1. RSS feed is updated via RAVE (http://www.ravemobilesafety.com/).
2. PHP converts RSS to JSON 
3. Moment.js helps determine time entry and lapse
4. If an alert is valid and posted within a pre-determined time (e.g, less than 24 hours), it will be displayed on top of the page.

## Future Improvements or Ideas

- "Safe word" or phrase that will prevent the alert from appearing, regardless of time lapsed. Useful for false alarms or human error.
- Information officers are trained to keep alert messages brief. However, the script could collapse a longer message. If lengthy instructions are needed, we wouldn't want to cut it off completely.