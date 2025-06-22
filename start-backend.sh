#!/bin/bash

echo "Starting Nonu Ecommerce Backend..."
echo "==============================================="
echo "Backend will run on: http://localhost:8080"
echo "H2 Console available at: http://localhost:8080/h2-console"
echo "Default login credentials:"
echo "  Admin: admin/admin123"
echo "  User:  user/user123"
echo "==============================================="
echo ""

mvn spring-boot:run 