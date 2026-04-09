require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"

ENV["JEKYLL_ENV"] = "production"

# ── CONFIGURATION ──────────────────────────────────────────────
# Replace with your GitHub Pages repository URL
GITHUB_PAGES_REPO = "https://github.com/yourusername/yourusername.github.io.git"
# ───────────────────────────────────────────────────────────────

desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end

desc "Generate and publish site to GitHub Pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin #{GITHUB_PAGES_REPO}"
    system "git branch -M main"
    system "git push origin main --force"

    Dir.chdir pwd
  end
end
