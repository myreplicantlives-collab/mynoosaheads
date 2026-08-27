import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { IMAGE_CREDITS } from "@/data/images";

export const metadata = {
  title: "Image credits",
  description: "Full attribution for every image used on mynoosaheads.com.",
};

export const dynamic = "force-static";

export default function ImageCreditsPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Image credits", url: `${baseUrl}/image-credits` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Image credits" }]} />
          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Image credits</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Every image, attributed</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              All photography on this site is sourced from Wikimedia Commons under Creative Commons
              licences that permit commercial use with attribution. We do not use AI-generated imagery
              in place of real photography. If you spot an image without proper attribution, please{" "}
              <Link href="/contact" className="link">tell us</Link>.
            </p>
            <p className="mt-2 text-xs text-parchment-500">
              Image inventory source: /Volumes/OpenClawLive/workspaces/sally/assets/noosa/IMAGE_MANIFEST.md
            </p>
          </header>

          <div className="mt-8 overflow-x-auto rounded-2xl bg-white border border-parchment-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-parchment-100 text-parchment-700">
                <tr>
                  <th className="px-3 py-3 font-medium">Subject</th>
                  <th className="px-3 py-3 font-medium">Source URL</th>
                  <th className="px-3 py-3 font-medium">Licence</th>
                  <th className="px-3 py-3 font-medium">Attribution</th>
                </tr>
              </thead>
              <tbody>
                {IMAGE_CREDITS.map((c, i) => (
                  <tr key={c.filename} className={i % 2 === 0 ? "bg-white" : "bg-parchment-50/40"}>
                    <td className="px-3 py-2 font-medium text-parchment-900">{c.subject}</td>
                    <td className="px-3 py-2">
                      <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="link break-all">{c.sourceUrl}</a>
                    </td>
                    <td className="px-3 py-2 text-parchment-700">{c.license}</td>
                    <td className="px-3 py-2 text-parchment-700">{c.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-10 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">Licence notes</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· <strong>CC BY-SA 4.0</strong> — Commercial use allowed, attribution required, share-alike.</li>
              <li>· <strong>CC BY-SA 3.0</strong> — Commercial use allowed, attribution required, share-alike.</li>
              <li>· <strong>CC BY-SA 2.5 / 2.0</strong> — Commercial use allowed, attribution required, share-alike.</li>
              <li>· <strong>CC BY 2.0</strong> — Commercial use allowed, attribution required, no share-alike requirement.</li>
            </ul>
            <p className="mt-3 text-xs text-parchment-500">
              Source attribution per individual file history on Wikimedia Commons. Where the original
              photographer is named on the source page, they are credited in the rendered caption.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
