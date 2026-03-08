from flask import Flask, request, jsonify, abort

app = Flask(__name__)

# in-memory storage for simplicity
_items: dict[int, dict] = {}
_next_id = 1


@app.route("/items", methods=["GET"])
def list_items():
    """Return a list of all items."""
    return jsonify(list(_items.values()))


@app.route("/items", methods=["POST"])
def create_item():
    """Create a new item. JSON body must contain a 'name' field."""
    global _next_id

    data = request.get_json(silent=True)
    if not data or "name" not in data:
        abort(400, description="Missing 'name' in request body")

    item = {"id": _next_id, "name": data["name"]}
    _items[_next_id] = item
    _next_id += 1
    return jsonify(item), 201


@app.route("/items/<int:item_id>", methods=["GET"])
def get_item(item_id: int):
    """Fetch a single item by ID."""
    item = _items.get(item_id)
    if not item:
        abort(404)
    return jsonify(item)


@app.route("/items/<int:item_id>", methods=["PUT"])
def update_item(item_id: int):
    """Update an existing item's name."""
    item = _items.get(item_id)
    if not item:
        abort(404)

    data = request.get_json(silent=True)
    if not data or "name" not in data:
        abort(400, description="Missing 'name' in request body")

    item["name"] = data["name"]
    return jsonify(item)


@app.route("/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id: int):
    if item_id in _items:
        del _items[item_id]
        return "", 204
    abort(404)


@app.route("/health", methods=["GET"])
def health_check():    
    """Simple health check endpoint."""
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    # simple development server
    app.run(host="0.0.0.0", port=5000, debug=True)
