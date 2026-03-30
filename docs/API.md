# API Reference

The BlogApp backend provides the following REST API endpoints. All requests should be prefixed with `/api`.

## Authentication

### Auth Routes (`/api/auth`)
- `POST /signup` - Register a new user.
- `POST /signin` - Authenticate a user and receive a JWT.
- `POST /google` - Google OAuth authentication.

## Users

### User Routes (`/api/user`)
- `GET /test` - Test endpoint.
- `PUT /update/:userId` - Update user profile (Protected).
- `DELETE /delete/:userId` - Delete user account (Protected).
- `POST /signout` - Sign out the current user.
- `GET /getusers` - Get all users (Admin only).
- `GET /:userId` - Get a specific user.

## Posts

### Post Routes (`/api/post`)
- `POST /create` - Create a new post (Protected).
- `GET /getposts` - Get all posts with filtering/pagination.
- `DELETE /deletepost/:postId/:userId` - Delete a post (Protected).
- `PUT /updatepost/:postId/:userId` - Update a post (Protected).

## Comments

### Comment Routes (`/api/comment`)
- `POST /create` - Add a comment to a post (Protected).
- `GET /getPostComments/:postId` - Get all comments for a post.
- `PUT /likeComment/:commentId` - Like/unlike a comment (Protected).
- `PUT /editComment/:commentId` - Edit a comment (Protected).
- `DELETE /deleteComment/:commentId` - Delete a comment (Protected).
- `GET /getcomments` - Get all comments (Admin only).

## AI Autocomplete

### Autocomplete Routes (`/api/autocomplete`)
- `POST /` - Get AI-generated suggestions for titles or content.
