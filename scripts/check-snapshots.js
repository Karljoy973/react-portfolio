// scripts/check-snapshots.js
import fs from "fs";
import path from "path";

function hasSnapshots(dir = "./") {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      if (hasSnapshots(path.join(dir, file.name))) return true;
    } else if (file.name.endsWith(".snap")) {
      return true;
    }
  }
  return false;
}

if (!hasSnapshots("./")) {
  console.error("❌ No snapshot tests found. At least one is required.");
  process.exit(1);
} else {
  console.log("✅ Snapshot tests detected.");
}
