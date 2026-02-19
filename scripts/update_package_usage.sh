uv run --with github-dependents-info github-dependents-info --repo langfuse/langfuse-python --markdownfile ./components-mdx/dependents/python.mdx --sort stars --mergepackages --verbose --minstars 10
sed -i '' 's/# Dependents/### Dependents/' ./components-mdx/dependents/python.mdx

uv run --with github-dependents-info github-dependents-info --repo langfuse/langfuse-js --markdownfile ./components-mdx/dependents/js.mdx --sort stars --mergepackages --verbose --minstars 10
sed -i '' 's/# Dependents/### Dependents/' ./components-mdx/dependents/js.mdx