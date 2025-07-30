# Task Manager

## Requirements

- Node.js/npm
- MySQL

---

## Getting Started

NOTE: The following commmands are for linux based systems

### 1. Clone the repository

```
git clone https://github.com/JakeScho/TaskManager.git
```

### 2. Import Database Schema
```
mysql -u your_username -p tasks < /path/to/local/repo/db/tasksSchema.sql
```

### 3. Install Node package dependancies
```
cd /path/to/local/repo/server/
npm install
```

### 4. Install React package dependancies
```
cd /path/to/local/repo/client/
npm install
```

### 5. Start Node server
```
cd /path/to/local/repo/server/
node index.js
```

### 6. Start Node server
```
cd /path/to/local/repo/client/
npm start
```



