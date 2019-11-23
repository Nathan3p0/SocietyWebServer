# SocietyWeb Server

## Table of Contents

1. [Description](#Description)
1. [API](#API)
1. [Technologies](#Technologies)


[Live App](http://societyweb.surge.sh/)

## Description

When it comes to keeping your team organized, you can often get lost in the paperwork of regular calendars and address books.  Our goal is to provide an online application that simplifies keeping track of your team.  So that you can focus on the things that matter.


SocietyWeb provides the key features that I have seen groups rely on and struggle with over the past few years.  Just in beginning stages of our launch we offer features like team messaging, event registration, member registration, calendar management, and much more to come.

> To view the Client Repo for SocietyWeb [here](https://github.com/Nathan3p0/societyweb-client)


## API

```

/api
.
--/auth
    --POST
      -/login
--/events
    --GET
      -/
      -/:id
      -/members
      -/members/:id
    --POST
     -/
     -/members
--/signup
    --POST
      -/admin
      -/member
--/members
    --GET
      -/
--/message
    --POST
      -/invite
      -/email

```

## Technologies

- React
- HTML
- CSS
- Node
- Express
- PostgreSQL
- Mocha/Chai/Jest
- Twilio API
- Heroku
- Surge
