---
title: 'React Dynamic Template Demo'
publishedDate: '2024-10-27'
modifiedDate: '2024-10-27'
tags:
  - react
  - work experiences
description: On-the-field notes on how we delivered this dynamic template project.
---

TLDR:

- Example repo [here](https://github.com/erikologic/react-dynamic-template-demo).
- Designed a type-safe, JSON-configurable templating system for React applications
- Used JSON schema and TypeScript for dynamic form and JSON editor validation
- Overcame initial technical and design disagreements, delivering a versatile solution with minimal maintenance
- Other key features included configuration aliasing, versioning, and optimistic concurrency

# React Dynamic Template Demo

## Who's this blog post for?

If you’re interested in the code and want a quick, referenceable example, check this [repository](https://github.com/erikologic/react-dynamic-template-demo).

If you’re here for the story behind the code, the challenges, and the trade-offs, keep reading.

## The context

If you’re familiar with [Kent Beck’s 3X Product Development model](https://medium.com/@kentbeck_7670/the-product-development-triathlon-6464e2763c46), we were deep in the transition from Explore to Expand.

I was working at CarbonRe, a company helping cement plants reduce their carbon footprint.  
Our models were saving clients thousands of dollars in fuel bills, and new clients were reaching out to be onboarded.

Each client required a customised configuration depending on their sensors, data, and chosen features.  
Based on these factors, we wanted our web app to look particularly tailored to each customer's needs.

We had an initial setup based on Django models — our MVP was originally built on a Django monolith.  
While it was intuitive to configure through the Django admin panel, maintenance was becoming increasingly challenging.

On side bants, I had occasionally shared my vision for a more sustainable solution.  
When it became clear that the current system would soon hit a wall, the team gave me the green light to design a new system.

## Product Engineering

The first thing I did was apply a Product Design approach.

I interviewed the various users of the configuration system, including Product and Platform team members.  
I asked what they liked about the current setup, friction and pain points, and ideas for improvement.

Interestingly, some assumptions I had made were quickly invalidated!  
Product folks were actually more open to working with code and dev processes than I expected.  
Meanwhile, some engineers insisted on a form-based approach to ensure data consistency and validation.

I advocated strongly for a code-based configuration, citing the advantages of IDE support, easy copy & paste, and improved readability (no endless form pages to scroll through — just collapsible JSON structures).  
_These preferences came from past experiences and from having hacked the Django-based config solution by interacting directly with the monolith API._

Product folks and some engineers were on board.  
Through further discussions, I tried to convince my manager and other engineers to avoid a purely form-based solution, instead proposing a JSON editor as a more flexible option.  
However, I was ultimately asked to deliver the form-based solution first, with the JSON editor as a stretch goal.  
I agreed to disagree and committed to delivering the best solution possible.

From my user research, I gathered these key requirements:

- Feature parity, including replicating the current various configurations in the new system:
  - Different configurations for different clients/environments
  - Configure dynamically different pages, including supporting routing and NavBar appearance
  - Support for different types of components/sections for the different pages/templates
- Edit configuration via forms, with potential JSON editor support
- Test configurations in production (with real data) without impacting the customer experience
- Support for rollback
- Promote configurations from staging to production
- Validate configurations before promoting to live
- Validate configurations before a code release

From these, I proposed the project:

- Each template would declare its configuration as JSON schema and/or TypeScript-supported definitions.
- Adding a new template would involve minimal code repetition.
- Configuration declarations would be used to dynamically generate forms and potentially validate code in the editor.
- Configuration data would be stored in DynamoDB.
- Configuration would be validated before saving.
- Configuration would be versioned, allowing rollback if needed and enabling optimistic concurrency control.
- Configuration would support aliasing, so different configurations could be tested for the same client in the same environment - even sharing a URL with the client for testing.

I was confident there was a way to generate forms based on JSON schema, derive TypeScript interfaces from it, and provide a JSON editor as a fallback—though I wasn’t sure exactly how.  
I spent a few days testing libraries to de-risk this part of the project.  
I had a bit of a despair moment when I tested a few of them, and although promising they were not matching in a way I could use them.

Eventually, I mixed up Typebox (for TypeScript-supported JSON schema), react-jsonschema-form (for dynamic form generation), and Monaco Editor (for an in-browser JSON editor with IntelliSense and a diff view). They worked well together, and matching 100% my vision!  
I was thrilled!

In less than a week, I had a working prototype, similar to the repository shared at the top of this article, which I presented to the team.

## The presentation

The team was impressed with the PoC and accepted it as a viable solution.

However, conversations soon shifted back to the form-based solution.  
Amusingly, some of the same people who had initially advocated for forms were now unsure about them!  
I suggested keeping both options, as maintenance would be almost none and it could potentially proove useful in the future.  
_After I left the company, my manager contacted me on LinkedIn to let me know that no one was using the form-based solution anymore!_

## What we delivered

We delivered nearly everything I proposed:

- A dynamic templating system requiring minimal maintenance that allowed both form and JSON editor configuration.
- Templates that exposed their configuration as JSON schema/TypeScript, minimising code repetition when adding new templates.
- Ability to configure from routing (and NavBar appearance) to different components/sections.
- JSON schema-based validation before saving configurations.
- Aliasing via URL query parameters.
- Backend configuration storage in DynamoDB with versioning, aliasing, and optimistic concurrency support.

Shortly after this, I left the company, while the following features were still in the backlog:

- An "undo" button for quick rollbacks.
- A CI/CD step to validate the current frontend release against configurations stored in DynamoDB.

## What I learned

Spike, de-risk, and trust are essential to successful projects.  
There was a significant portion of this project that could have gone wrong.  
I wasn’t initially sure how to integrate JSON schemas, TypeScript, form generation, and JSON editing — but I believed it was possible.  
I appreciated the team for buying into the vision and giving me time to explore and de-risk this part of the project!

I was proud of my approach when facing strong opposition.  
I delivered the best solution I could for something I didn’t fully agree with, leaving me some time to explore my ideas, eventually winning team support.

I also spent time thinking about whether to treat configuration as code or as data — a question I’m still undecided on.
On one hand, setting up app configurations, observing changes in a safe environment, and needing version control feels a lot like a typical development process.  
Also, the importance of versioning and "branching" configurations was clear - so why not just use git?! _Offering a diff editor was a great trick here. Bravo me!_  
On the other hand, you may want to roll back to yesterday’s software without affecting today’s configuration — so why tightly couple the two?

## Wanna know more?

Reach out to me on [LinkedIn](https://www.linkedin.com/in/enrico-graziani-10ba5a140/)!
