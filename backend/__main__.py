from app import create_app

# Create the Flask app instance
app = create_app()


@app.route('/')
def home():
        return "This is a test"
   


# Run the app if this is the main module being executed
if __name__ == "__main__":
    app.run(debug=True)  # Start the development server in debug mode
