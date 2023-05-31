# 👣 Blueprint Diagnostic Screener API 🔵

[Deployed](https://blueprint-api.vercel.app/)

## Table of Contents
- [Introduction](#introduction)
- [Planning](#planning)
- [Features](#features)
- [Future Features](#future-features)
- [Reflection](#reflection)
- [Technologies](#technologies)
- [Resources](#resources)
- [Contributor](#contributors)

## Introduction
This api was built in Express for the Blueprint take home challenge, and includes a `get` and `post` request. 

## Planning
[Linear Board](https://linear.app/kitty-catlyn/project/blueprint-survey-a43129818358/KIT)
Used for planning and organizing FE & BE tasks

[Data Planning](https://www.figma.com/file/zq5DXfcTviYKmYnO90BQLa/Data-Planning?type=whiteboard&node-id=0-1&t=zDNfXTUwrNg3xBZg-0)
Implemented to organize data structure and user flows

## Features
- `/get` request includes `/screener` url which returns the screener object
- `/post` request takes in an array of patient answers and returns `level_two_assesments` based on scores

*** `domains` data is currently hard-coded in the express api. I considered learning mysql in order to apply this properly, but decide to focus on building an effective backend in express and a user-friendly UI. 

### Future Features
If given more time to work on the back-end of this application, my main focuses would be : 

### Security 
Another thing I'm interested in learning more about is how to make this api secure. Because the `post` request deals with sensitive information, it seems important that this data would have no possibility in being interested. 
 
### Testing 
Because it was my first time building a functional backend with express, it took some learning to figure out how to test the requests I was making. Eventually I figured out how to use nodemon for active refreshes, and apply the correct urls to the local environments to ensure my `/get` requests were working. However, I'm still uncertain on how to test the `post` request, even manually, and would have spent more time on that. 

### Error Handling
While I attempted to implement appropriate responses for 400 and 500 status codes, I am not entirely sure how effective those methods are, and am quite certain there could be more improvement in this regard. 

## Reflection
Overall I had a great learning experience building a functional backend with express for the first time! The struggles I had included having difficulty testing the conversation between the front and backend, but overall enjoyed the process of working more with the backend. 

## Technologies
- Express 
- Nodemon
- Deployed on Vercel

## Resources
- If you're interested in the resources I used to learn Express and write the code, I made a google doc of the bookmarks I made throughout the process [here](https://docs.google.com/document/d/1BOWXTLBpDqrDSKs94pmrupDi4ant0sFlDBbqzvMCl0c/edit?usp=sharing)

### Contributors
- [Catlyn Bowles](https://www.linkedin.com/in/catlyn-bowles/)

