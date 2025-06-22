# Ecommerce

A modern, full-stack ecommerce application built with Spring Boot and React.

## Features

### Backend (Spring Boot)

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: Full CRUD operations for products with categories and search
- **Shopping Cart**: Add, update, and remove items from cart
- **User Management**: User registration, login, and profile management
- **Security**: Spring Security with JWT tokens
- **Database**: H2 in-memory database (easily configurable for production)
- **API Documentation**: RESTful API endpoints

### Frontend (React)

- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with search, filtering, and pagination
- **Shopping Cart**: Add items to cart and manage quantities
- **User Authentication**: Login and registration with persistent sessions
- **Admin Dashboard**: Product management for admin users
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack

### Backend

- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- H2 Database
- JWT (JSON Web Tokens)
- Maven

### Frontend

- React 18
- React Router
- Tailwind CSS
- Heroicons
- Axios
- Context API for state management

## Quick Start

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the project root directory:

```bash
cd nonu
```

2. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Default Users

The application comes with pre-loaded sample data:

### Admin User

- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Administrator (can manage products)

### Regular User

- **Username**: `user`
- **Password**: `user123`
- **Role**: User (can shop and manage cart)

## API Endpoints

### Authentication

- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Products

- `GET /api/products` - Get all products (with pagination, search, filtering)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Shopping Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

## Database

The application uses H2 in-memory database for development. You can access the H2 console at:

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:ecommerce`
- Username: `sa`
- Password: `password`

## Sample Products

The application comes with pre-loaded sample products in the following categories:

- Electronics (iPhone, MacBook, Smart Watch, Headphones)
- Clothing (T-Shirts, Jeans, Jackets, Shoes)
- Home & Garden (Coffee Maker, Plants, Desk Lamp, Pillows)
- Books (Programming, Cooking, Photography)

## Development

### Adding New Features

1. **Backend**: Add new entities in `src/main/java/com/ecommerce/model/`
2. **Repositories**: Create repositories in `src/main/java/com/ecommerce/repository/`
3. **Services**: Add business logic in `src/main/java/com/ecommerce/service/`
4. **Controllers**: Create REST endpoints in `src/main/java/com/ecommerce/controller/`

### Frontend Structure

```
frontend/src/
├── components/     # Reusable components
├── context/        # React context providers
├── pages/          # Page components
├── services/       # API service functions
└── App.js          # Main application component
```

## Production Deployment

### Backend

1. Update `application.yml` to use a production database (PostgreSQL, MySQL, etc.)
2. Set proper JWT secret key
3. Configure CORS for your domain
4. Build with `mvn clean package`
5. Deploy the JAR file

### Frontend

1. Update API URLs in service files
2. Build with `npm run build`
3. Deploy the build folder to a web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Screenshots

### Home Page

Modern landing page with hero section and featured products

### Product Catalog

Browse products with search, filtering, and pagination

### Shopping Cart

Manage cart items with quantity updates and removal

### Admin Dashboard

Manage products with full CRUD operations

## Support

For support and questions, please open an issue in the GitHub repository.
