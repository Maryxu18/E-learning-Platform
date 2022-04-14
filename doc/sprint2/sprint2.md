## Sprint 2 Plan

### Participating Members: 
    - Jenny Ho
    - Xin Ya Xu
    - Richard Zheng
    - Alexander Efimov
    - Hongkang Yu
    - Kenneth Daniel

All participating members had roles and discussed the breakdown of tasks. 

### Sprint Goals:
    - Upload prerecorded content: we want to create an API for uploading prerecorded educational content to the server
        - requires:
            - design to ensure consistent interface between back end and front end
            - UI mockup to build front end from
            - back end to handle upload requests and store data somewhere
            - front end to provide user interface for uploading files
    - View prerecorded content: allow participants to view prerecorded content
        - requires:
            - design to ensure consistent interface between back end and front end
            - UI mockup to build front end from
            - back end to stream content to client
            - front end to provide user interface for viewing content
    - 'Forgot password' prompt: create a prompt that allows users to reset their passwords via email
        - requires:
            - API endpoint to reset password and generate a short-lived token that allows password reset
            - email sent to client: text and general layout, as well as the mechanics of sending the email
    - Editing user profiles: Let users edit their profiles
        - requires:
            - UI mockup for edit page
            - front end edit page
            - back end, though this should need few changes - the API for setting a user profile is already there
    - Viewing user profiles: Let users view their own as well as others' profiles
        - requires:
            - UI mockup for own and others' profile pages
            - front end for viewing profile
            - API for retrieving user profiles
    - Education homepage: the section of the site where educational content lives
        - requires:
            - UI mockup for homepage
            - design of content: how is it organized and how each piece is defined
            - front end for homepage
            - navigation between different site components (front end)
            - API for retrieving homepage content: list of posts?
   
### Spikes
(in order of decreasing risk)

    - viewing uploaded content requires streaming the content to clients which could be very challenging
    - uploading videos could be challenging since video files are large
    - the education homepage/navigation could be messy if we don't have a sufficiently-good design
   

### Team Capacity: 
    Last sprint we completed 40 points of work. With 6 members and 10 working days, that puts our velocity at 2/3 points per person per day.
    This sprint has some more challenging objectives, so we would need a higher velocity to achieve our goals. 
    Thankfully, we have 6 completable user stories so we could reduce the scope of this sprint if we find it too tough.
