# Encryption 

The database system uses two different security layers because both problems are different.

---

# 1. encryption.js → Full Database Protection

`encryption.js` is used to encrypt the entire collection storage before saving data into cluster files.

This protects the database itself from being read directly from the filesystem.

example:
- Without encryption: 
```js
[
  {
    "name": "Sunil",
    "email": "sunil@gmail.com"
  }
]
```
- With encryption:
```js
U2FsdGVkX1...
```

This means:
- collection files are unreadable
- raw data is hidden
- database becomes protected


# 2. bcrypt.js → User Password Protection
bcrypt.js is specifically used for passwords.
Passwords should never be reversible or decrypted.
Instead of encrypting passwords, they are hashed using bcrypt.

Example:
- password : `123456`

Becomes:
- password : `$2b$10$h81/g8sp2JheRBm/xLDMaeKHDwT6JIyquwGRq30qFzSqoyER.5TSu`

# During login 
```
Input Password
      ↓
bcrypt compare
      ↓
Match Result (true/false)
```

# Important thing 
- Database encryption can be decrypted
- Password hashes cannot be decrypted
- 
That is why:

- collections use encryption
- passwords use bcrypt hashing