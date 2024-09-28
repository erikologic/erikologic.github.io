---
title: 'How we won at O11y'
publishedDate: '2024-09-28'
modifiedDate: '2024-09-28'
tags:
  - o11y
description: Some notes on how I helped converting CarbonRe into an Observability house.
---

TLDR

- strong leadership support
- autoinstrumentation
- offer insights regularly, and compare with other tools
- find "play-friends", mentor and pair often
- curate boards and alarms deeply intertwined with business value

## Contents

## The context

I joined the business very early in our product development, while much of it was in a rough format.  
There have been some attempt at adding some sorts of monitoring and alarming, but we really relied on raw plain text logs and Sentry for almost everything.

Bob, my manager, asked me to change this and bring that observability mentality we had at Cazoo.

This article is a recollection of what made us go from 0 to full observability.  
Is intended as a future reference for me, but also as an example for others on what it could take to move an organisation, while providing with some learning lessons as well.

## Which observability?

When I say "observability", what I'm relly thinking is [Charity Majors' Observability 2.0](https://charity.wtf/tag/observability-2-0/):

- wide structured spans, mainly
- high-cardinality
- the ability to freely dice'n'slice your collected data, and move easily between the forest and the trees

More importantly, is the idea that our systems are observable in production, and we would be able to comfortably answer any _unknown_ that might arise, without the need to set up further instrumentation in the aftermath.

It shouldn't come as a surprise then that our stack was based on OpenTelemetry and HoneyComb (incidentally, Charity is the CTO there) - quick info on the why:

- OpenTelemetry is probably the today standard for handling observability telemetries (event, spans, metrics, logs, ...)
- HoneyComb is a data store and query engine for telemetries, offering the capability to receive and display well multi-dimensional high-cardinal event, offering tools to quickly move between aggregation and deeply-detailed views.

## Serverless Autoinstrumentation

Soon we started transitioning from a service based to a serverless approach, using the Serverless framework.

I wrote a plugin to autoinstrument our lambdas so that we would start collecting telemetries without engineers even be aware it was happening.

_For us, this plugin was kind of required because we were using the Pants build system and that came with its own quirks. You might not be required to go this far._  
The [OTel Lambda page](https://opentelemetry.io/docs/faas/lambda-auto-instrument/) is a good starting point on learning how and start collecting Lambda telemetries.  
_Note, at the time I was working on this, OTel and AWS diverged on docs and practices, so information on the web was kind of complex to navigate._

## Adopt a consulting model

Once I started collecting telemetries, I... did nothing!

I made some attempt that failed previously, so I agreed with my manager to adopt a passive approach.  
Whenever questions would pop up on Slack, I would answer them with HoneyComb query links, possibly comparing with CloudWatch Logs and/or Sentry.  
1-2 times a week, I would spend some minutes digging around in HoneyComb and provide some novel insights in Slack.

## O11y _in your face_

At some point I set up a biz wide meeting.  
I explained the need of multi-dimensional high-cardinal events, using an high street shop as an example.  
I explained the 3 pillars: Metrics, Logs and Events.  
I added a wow factor at the end by embedding a face detection ML model into the FE app, connecting it with the webcam and the OTel library, and showing when our Product Owner was looking at the web app from an HoneyComb query page.  
_Although understanding engagement patterns were a huge problem for us at the time, luckily, nobody in the business wanted that feature deployed to production!_  
Finally, I invited people to connect on Slack #o11y for any type of request.

That sparked some interest which unfortunately soon faded away.  
I had a bit of depressive moment after that stage, cause all my initiatives so far landed short of making the impact I wanted.  
Later, I learned that the meeting actually had a good impact, but people were just unsure on what to do next, and how to transition from their current way of operating to one where we could have a "full observability" approach.

## 1-2-4...100%

Eventually, I found Chiara in ML resonating with the message I was trying to pass.  
I started collaborating closer with her, and that helped evangelising the O11y approach further through the business: Chiara used HoneyComb to bring within the ML team a deeper understanding of how their systems were performing, converting Michael and soon the rest of the troop.

Eventually, many messages in Slack were coming with an HoneyComb link supporting the findings.
We also started spending more time in curating boards, alarms and SLOs.

## Adapters & the pipeline board

One turning point was reached while we started productionising our new serverless data pipeline.  
We had long agreed to adopt a Ports & Adapters design architecture when developing services.  
Bob instrumented part of the pipeline using data attributes constants, and I refactored some Adapters to use those.  
Immediately, every service would start emitting telemetry with things like:

- the query against the DB, and parameters
- rows and cols read/wrote
- data latency metrics

Bob also built a board to visualise this data.  
Thanks to HoneyComb query/data viz capabilities like the GROUP clause, the board would be quite dynamic and flexible: e.g. adding a service would not require changes to the board, HoneyComb would just visualise another line in a timeseries view with a different name.

Once the Adapter work got connected, people realised the power of HoneyComb: e.g. from the generic widget showing the number of metrics being ingested across a number of services, with 2 clicks we would be able to read the query run on one particular runtime and observe the rest its perfomance.  
Most of this was achieved effortlessly.

Bob created another interesting board, the "annoyance alarm".  
Any webapp HTTP query that would take >400 ms would be reported.  
It is not technically an error, neither an infringement of agreed business terms, but is a good indicator of the current customer experience - and its evolution.

## Alarm on real biz issues

Initially our alarming was based on CloudWatch Alarms and Sentry.  
They are good and reliable service but they have their own quirks:

- CloudWatch Alarm is deeply limited by the Cloudwatch inability of dealing with high-cardinal metrics at an affordable price.
- Sentry is good, I like it and would use it again as a no-hassle error reporting tool. There are things in their o11y offering that fall shorter of HoneyComb though IMO.

What I particularly appreciated of working with HoneyComb is its flexibility in setting up alarms that are deeply attached to a business value.  
For example, one of our product features was to send data via MQTT back to the plant.  
We set up a HoneyComb trigger to alert one of our general channel when this wasn't happening.  
There could be a number of components that could possibly contribute to this failure, they would be monitored differently and alert a much more limited audience (e.g. either Platform or ML engineers).
If such failure would arise, only the right persons would be notified, and they would be receiving all the needed context from the alarm itself, including Product _(coincidentally our customer main point of contact)_.

At some point, we improved this further by adding some conditionality on the triggers.  
We added a service upstream that was responsible for triggering the workflow that would eventually send this MQTT data.  
We logged the upstream service decision into a telemetry, and use it as an alternative signal for that alarm, so that HoneyComb could confirm we either decided not to trigger the downstream workflow, or we had sent that MQTT data out.

We also experimented with SLOs, succesfully, although we had to come back on it due to architecture refactorings.  
One worthwhile mentioning is the Latency SLO.  
We had long discussed how to properly monitor this new data pipeline, and eventually settled on just monitoring the data latency at the latest stage: all our customer really need is to receive the data in the agreed time - they would care much less about Service A failing, S3 being late, or a lambda late on retry...  
HoneyComb offers plenty of tools on alarming around SLOs so that a random spike would not raise any concerns, alerting only when the rate of errors is projected to consume the service error budget.

## Conclusion

I was so surprised and pleased by the transformation this had on the business.

When I joined, engineers would merge their changes, maybe check that things were working, and then moving on.  
Also, there were a general lack of trust on the alarming systems, and widespread anxiety of not knowing which part of the systems might be broken at any time.

When I left, the whole business was much sold on alarming, and feeling confident that our toolings would advice if our customer were experiencing any sorts of reduced services.
Also, a culture of curiosity picked up about understanding how services were running in production: what were their performance, how well they were doing, who was using them, what were the patterns.

Gimme a buzz on [LinkedIn](https://www.linkedin.com/in/enrico-graziani-10ba5a140/) if you are interested in discussing this further!
