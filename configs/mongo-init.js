db.createUser({
	user: "the_username",
	pwd: "the_password",
	roles: [
		{
			role: "dbOwner",
			db: "inventory",
		},
	],
});

(async () => {
	await db.createCollection("users");
	const userOne = await db.users.insertOne({
		username: "john smith",
		password: "password",
		createdAt: new Date(),
		updatedAt: new Date()
	});
	const userTwo = await db.users.insertOne({
		username: "joe willis",
		password: "password",
		createdAt: new Date(),
		updatedAt: new Date()
	});

	await db.createCollection("warehouses");
	const warehouseOne = await db.warehouses.insertOne({
		name: "LAC-1",
		city: "Los Angeles",
		state: "CA",
	});
	const warehouseTwo = await db.warehouses.insertOne({
		name: "NYC-1",
		city: "New York City",
		state: "NY",
	});

	await db.createCollection("announcements");
	await db.announcements.insertOne({
		user: userOne.insertedId,
		warehouse: warehouseOne.insertedId,
		content: "los angeles announcement",
		priority: "Low",
		createdAt: new Date(),
		updatedAt: new Date()
	});
	await db.announcements.insertOne({
		user: userOne.insertedId,
		warehouse: warehouseOne.insertedId,
		content: "another los angeles announcement",
		priority: "High",
		createdAt: new Date(),
		updatedAt: new Date()
	});
	await db.announcements.insertOne({
		user: userTwo.insertedId,
		warehouse: warehouseTwo.insertedId,
		content: "new york announcement",
		priority: "Medium",
		createdAt: new Date(),
		updatedAt: new Date()
	});

	await db.createCollection("products");
	db.products.insertOne({
		name: "some los angeles product",
		warehouse: warehouseOne.insertedId,
		priority: "Out of Stock",
		type: "Inventory",
		createdAt: new Date(),
		updatedAt: new Date()
	});
	db.products.insertOne({
		name: "another los angeles product",
		warehouse: warehouseOne.insertedId,
		priority: "Out of Stock",
		type: "Inventory",
		createdAt: new Date(),
		updatedAt: new Date()
	});
	db.products.insertOne({
		name: "some new york product",
		warehouse: warehouseTwo.insertedId,
		priority: "Out of Stock",
		type: "Inventory",
		createdAt: new Date(),
		updatedAt: new Date()
	});
})();
