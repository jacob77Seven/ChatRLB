import os

def load_config(filepath='config.txt'):
    """
    Loads a configuration file and returns a dictionary of settings.

    Args:
        filepath (str): The path to the configuration file.

    Returns:
        dict: A dictionary containing the configuration settings,
              or None if the file cannot be found.
    """
    # Check if the configuration file exists
    if not os.path.exists(filepath):
        print(f"Error: Configuration file not found at '{filepath}'")
        return None

    # Initialize an empty dictionary to store settings
    settings = {}
    
    print(f"Reading configuration from '{filepath}'...")

    try:
        # Open the file for reading
        with open(filepath, 'r') as f:
            # Read the file line by line
            for line in f:
                # Strip leading/trailing whitespace from the line
                line = line.strip()

                # Ignore empty lines and lines that start with '#' (comments)
                if not line or line.startswith('#'):
                    continue

                # Split the line into key and value at the first '=' sign
                if '=' in line:
                    key, value = line.split('=', 1)
                    
                    # Strip whitespace from the key and value
                    key = key.strip()
                    value = value.strip()
                    
                    # Store the key-value pair in the settings dictionary
                    settings[key] = value
                else:
                    print(f"Warning: Skipping malformed line: '{line}'")
    except Exception as e:
        print(f"An error occurred while reading the file: {e}")
        return None
        
    print("Configuration loaded successfully.")
    return settings