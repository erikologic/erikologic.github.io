---
title: 'How we won the O11y game at CarbonRe'
publishedDate: '2024-09-29'
modifiedDate: '2024-09-29'
tags:
  - o11y
description: Some notes on how I helped convert CarbonRe into an Observability house.
---

TLDR

- strong leadership support
- autoinstrumentation
- offer insights regularly and compare with other tools
- find "play-friends", mentor and pair often
- curate boards and alarms deeply intertwined with business value

## Contents

## The context

I joined CarbonRe very early in our product development, while much of it was in a rough format.  
There have been some attempts at adding some sort of monitoring and alarming, but we relied on raw plain text logs and Sentry for almost everything.

Bob, my manager, asked me to change this and bring that observability mentality we had at Cazoo.  
In his experience, you would get enormous value from instrumenting “everything”, and he was eager for us to become a HoneyComb house.

This article recalls what made us go from 0 to "full observability".  
It is intended as a future reference for me, but also as an example for others on what it could take to move an organisation, while providing some learning lessons.

## Which observability? Why? How?

When I say "observability", what I'm thinking is [Charity Majors' Observability 2.0](https://charity.wtf/tag/observability-2-0/).  
It is the idea that our systems are observable in production, and we would be able to comfortably answer any _unknown_ that might arise without the need to set up further instrumentation in the aftermath.  
This can only be achieved with collecting wide structured high-cardinal events and analysing them through a platform that allows you to freely dice and slice your collected data and move easily between the forest and the trees.

Our stack was based on OpenTelemetry and HoneyComb (incidentally, Charity is the CTO there) - quick info on the why:

- OpenTelemetry is probably today’s standard for handling observability telemetries (event, spans, metrics, logs, ...)
- HoneyComb is a data store and query engine for telemetries capable of analysing your collected data in the way required for Observability 2.0.

## FE instrumentation

_LESSON #1: Be sure to check with the business if what you are doing is needed, no matter where the initial request came from!_

Challenged by the leadership team to pull more BI data from our web app, I instrumented the FE with a few auto instrumentation libraries, plus adding some additional telemetries/attributes to:

- know which customer was generating that telemetry
- observe their usage patterns: how many tabs, how long the windows were active, were they sharing logins, were they looking at particular pages or interacting with particular widgets
- understand whether they were experiencing any sort of issues

I was quite happy with the result, in 2-3 days, I had been able to answer the long list of questions we had received.  
But when I presented them to the team, someone from Product (who missed the initial convo) showed us how they were already answering most of these questions either directly or with proxy figures.  
In the end, I spent time building something good but unneeded.  
It felt frustrating.

## Serverless Autoinstrumentation

Soon, we started transitioning from a service-based to a serverless approach, using the Serverless framework.

I wrote a plugin to auto-instrument our lambdas so that we would start collecting telemetries without engineers even being aware it was happening.  
_For us, this plugin was kind of required because we were using the Pants build system and that came with its quirks. You probably don't have to go this far._

The [OTel Lambda page](https://opentelemetry.io/docs/faas/lambda-auto-instrument/) is a good starting point for learning how to start collecting Lambda telemetries.  
_Note: at the time I was working on this, OTel and AWS diverged on docs and practices, so information on the web was kind of complex to navigate._

## Adopt a consulting model

_LESSON #2: Sometimes, you need to plant the seeds and patiently wait for harvest time rather than just reach for the lower-hanging fruits._

Once I started collecting telemetries, I did... nothing!

After my previous failure, I previously agreed with my manager to adopt a passive approach.  
Whenever questions would pop up on Slack, I would answer them with HoneyComb query links, possibly comparing them with CloudWatch Logs and/or Sentry.  
1-2 times a week, I would spend some minutes digging around in HoneyComb and provide some novel insights in Slack.

## O11y _"in your face"_

_LESSON #3: asking for behavioural change is an extremely complex request, people might be curious about the reasons, but they need much more help in setting up new habits._

At some point, I set up a business-wide meeting.  
I explained the need for multi-dimensional high-cardinal events, using a high-street shop as an example.  
I explained the three pillars: Events, Logs and Metrics.  
I added a wow factor at the end by embedding a face detection ML model into the FE app, connecting it with the webcam and the OTel library, and showing when our Product Owner was looking at the web app from a HoneyComb query page.  
_Although understanding engagement patterns was a huge problem for us at the time, luckily, nobody in the business wanted that feature deployed to production!_  
Finally, I invited people to connect on Slack #o11y for any type of request.

That sparked some interest, which unfortunately soon faded away.  
I had a bit of a depressive moment after that stage because all my initiatives so far had fallen short of making the impact I wanted.  
Later, I learned that the meeting had a good impact, but people were just unsure of what to do next and how to transition from their current way of operating to one where we could have a "full observability" approach.

## 1-2-4...100%

_LESSON #4: When introducing something new, find innovators and early adopters, make them your buddies!_

Eventually, I found Chiara in ML resonating with the message I was trying to pass.  
I started collaborating closer with her, and that helped evangelise the O11y approach further through the business: Chiara used HoneyComb to bring within the ML team a deeper understanding of how their systems were performing, converting Michael and soon the rest of the troop.

Eventually, many messages in Slack were coming with a HoneyComb link supporting the findings.
We also started spending more time in curating boards, alarms and SLOs.

## Adapters & the pipeline board

_LESSON #5: Good coding practices have unpredictably good ROI._

One turning point was reached while we were making our new serverless data pipeline ready for production.  
We had long agreed to adopt a Ports & Adapters design architecture.  
Bob instrumented part of the pipeline with custom data-mangling metrics, for which he wrote a module with constants and functions. I refactored some Adapters to use those.  
Immediately, most of the services would start emitting telemetry with things like:

- the actual SQL query against the DB and parameters
- rows and cols read or write
- data latency metrics

Bob also built a board to visualise this data.  
Thanks to HoneyComb query/data viz capabilities like the GROUP clause, the board would be quite dynamic and flexible: e.g. adding a service would not require changes to the board, HoneyComb would just visualise another line in a time-series view with a different name.

Once the Adapter work got connected, people realised the power of HoneyComb: e.g. from the generic widget showing the number of metrics being ingested across several services, with two clicks, we would be able to read the query run on one particular runtime and observe the rest of the runtime performance.  
Most of this was achieved effortlessly.

_LESSON #6: It's common to automate the "what is failing" scenario, but what about the "what if things are so so" one? This was a very interesting finding..._

Bob created another interesting board called "customer annoyance".  
Any webapp HTTP query that would take >400 ms would be reported.  
It is not technically an error (or potentially is?), nor an infringement of agreed business terms, but it is a good indicator of the evolution of the customer experience.

## Alarm on real biz issues

Initially, our alarming was based on CloudWatch Alarms and Sentry.  
They are good and reliable service, but they have their quirks:

- CloudWatch Alarm is deeply limited by Cloudwatch’s inability to deal with high-cardinal metrics at an affordable price.
- Sentry is good, I like it and would use it again as a no-hassle error reporting tool. There are things in their o11y offering that fall shorter of HoneyComb, though, IMO.

What I particularly appreciated about working with HoneyComb is its flexibility in setting up alarms that are deeply attached to a business value.  
For example, one of our product features was to send data via MQTT back to the plant.  
We set up a HoneyComb trigger to alert one of our general channels when this wasn't happening.  
There could be several components that could contribute to this failure; they would be monitored differently and alert a much more limited audience (e.g. either Platform or ML engineers).
If such failure arose, only the right persons would be notified, and they would receive all the needed context from the alarm itself, including Product _(coincidentally our customer’s main point of contact)_.

## Composite alarms

_LESSON #7: Setting up alarms that were able to factor in different components had revealed a game changer in nulling our alarm fatigue. I found it extremely cool, and I have received some extremely good feedback for it._

At some point, we improved this further by adding some conditionality to the triggers.  
At the time, we added a service upstream that was deciding whether it would be time to trigger the workflow that would eventually send this MQTT data or not.  
We decided to log the upstream service decision into telemetry and used it as an alternative signal for that alarm, so that HoneyComb could monitor if we either decided not to trigger the downstream workflow or we had sent that MQTT data out, and raise an alarm in case these conditions were both not met.

## SLO

_LESSON #8: Start thinking hard "what your customer care". The answer might not be coming easily, but eventually, it would pay off._

_LESSON #9: Alarming on the error budget is the way to go._

We also experimented with SLOs successfully, although we had to come back on it due to architecture refactorings.  
One worth mentioning is the Latency SLO.  
We had long discussed how to properly monitor this new data pipeline and eventually settled on just monitoring the data latency at the latest stage: all our customers need is to receive the data in the agreed time - they would care much less about Service A failing, S3 being late, or a lambda late on retry...  
HoneyComb offers plenty of tools for alarming on SLOs so that a random spike would not raise any concerns, alerting only when the rate of errors is projected to consume the service error budget.

## Conclusion

I was so surprised and pleased by the transformation this had on the business.

When I joined, engineers would merge their changes, maybe check that things were working, and then move on.  
Also, there was a general lack of trust in the alarming systems and widespread anxiety about not knowing which part of the systems might be broken at any time.

When I left, the whole business was much sold on alarming, and feeling confident that our toolings would advise if our customers were experiencing any sort of reduced services.  
Also, a culture of curiosity picked up about understanding how services were running in production: what were their performance, how well they were doing, who was using them, what were the patterns. I was pleased to see engineers poking at HoneyComb and exchanging links just for sheer curiosity!

Debugging live issues was a breeze: the last month I was there, the Mean Time to Restore was around 56 mins (~30 minutes being the CICD pipeline).

We had several boards in every aspect of Engineering that were providing data to support decisions: which features were mostly used by our customers, which services were giving us the most problems and required more love, how bad AWS Timestream performances were from time to time and why we needed to work out a replacement soon; which CICD jobs were adding the most delays to landing commits in production; etc...

During my last period at CarbonRe, I often mentioned that I would find it hard to work again in an environment without that level of observability and understanding of how the software operated in production - a feeling that was often reflected by my colleagues.

And you? How do you feel about O11y? Do you have any experience to share? Got any questions?  
Gimme a buzz on [LinkedIn](https://www.linkedin.com/in/enrico-graziani-10ba5a140/) if you are interested in discussing this further!
