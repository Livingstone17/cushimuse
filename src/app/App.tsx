// import { useState } from "react";
// import { Button } from "./components/ui/button";
// import { Label } from "./components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
// import { Textarea } from "./components/ui/textarea";
// import { Input } from "./components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
// import { Sparkles, Copy, Check } from "lucide-react";
// import { toast } from "sonner";
// import { Toaster } from "./components/ui/sonner";
// import { InstallPrompt } from "./components/InstallPrompt";

// export default function App() {
//   const [title, setTitle] = useState("");
//   const [postType, setPostType] = useState("");
//   const [platform, setPlatform] = useState("");
//   const [tone, setTone] = useState("");
//   // const [generatedCaption, setGeneratedCaption] = useState("");
//   const [generatedCaption, setGeneratedCaption] = useState(() => {
//     console.log("Intialized generatedCaption");
//     return "";
//   });
//   const [copied, setCopied] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);

//   //optimize the prompt construction
//   const buildChurchPrompt = () => {
//     const platformLabel =
//       platform === 'instagram' ? 'Instagram' :
//         platform === 'facebook' ? 'Facebook Page' :
//           platform === 'twitter' ? 'Twitter/X' : 'LinkedIn';

//     // Map post types to natural language
//     const postTypeLabels: Record<string, string> = {
//       announcement: 'an important announcement',
//       event: 'an upcoming event',
//       educational: 'a devotional or Bible teaching',
//       promotional: 'an invitation to get involved',
//       testimony: 'a personal story of faith',
//       prayerRequest: 'a request for prayer support'
//     };

//     const toneLabels: Record<string, string> = {
//       inspirational: 'hopeful and uplifting',
//       welcoming: 'warm and inviting',
//       joyful: 'celebratory and energetic',
//       reflective: 'thoughtful and peaceful',
//       educational: 'clear and insightful'
//     };

//     return `You lead social media for a local church. Write one short caption (${platformLabel}) for ${postTypeLabels[postType] || 'a ministry update'} with a ${toneLabels[tone] || 'positive'} tone.

//   Details:
//   - Title/topic: "${title}"
//   - Keep it 20–25 words.
//   - Use active voice: "Join us..." not "We're having..."
//   - For Instagram/Twitter + joyful tone: add 1 emoji (🙏✨🙌) and 1–2 hashtags like #FaithFamily
//   - Never use slang, emojis, or hashtags on Facebook/LinkedIn.
//   - Focus on community, hope, and practical next steps — not abstract theology.

//   Caption only — no labels, quotes, or explanations.`;
//   };

//   const handleGenerate = async () => {
//     setIsLoading(true);
//     const prompt = `Write a short, engaging social media caption for a church ministry post.
//   Platform: ${platform}
//   Post type: ${postType}
//   Tone: ${tone}
//   Title or topic: "${title}"`;

//     try {
//       const response = await fetch('http://localhost:3001/caption', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       // ✅ Read the response body ONLY ONCE
//       const responseBody = await response.text();
//       console.log('Raw response:', responseBody);

//       if (!response.ok) {
//         // Try to parse error as JSON, but fall back to raw text
//         let errorMessage = 'Failed to generate caption';
//         try {
//           const errorData = JSON.parse(responseBody);
//           errorMessage = errorData.error || errorMessage;
//         } catch (e) {
//           // If not valid JSON, show first 100 chars
//           errorMessage = `Server error: ${responseBody.substring(0, 100)}`;
//         }
//         throw new Error(errorMessage);
//       }

//       // ✅ Parse the success response
//       const data = JSON.parse(responseBody);
//       setGeneratedCaption(data.caption); // 👈 Now this will work!
//       toast.success("Caption generated successfully!");
//     } catch (error: any) {
//       console.error("Generation error:", error);
//       toast.error(error.message || "Failed to generate caption. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard.writeText(generatedCaption)
//         .then(() => {
//           setCopied(true);
//           toast.success("Caption copied to clipboard!");
//           setTimeout(() => setCopied(false), 2000);
//         })
//         .catch(() => {
//           // Fallback to legacy method
//           copyTextFallback(generatedCaption);
//         });
//     } else {
//       // fallback method if Clipboard API not available
//       copyTextFallback(generatedCaption);
//     }
//   };

//   const copyTextFallback = (text: string) => {
//     const textarea = document.createElement('textarea');
//     textarea.value = text;
//     textarea.style.position = 'fixed';
//     textarea.style.left = '-999999px';
//     textarea.style.top = '-999999px';
//     document.body.appendChild(textarea);

//     try {
//       textarea.focus();
//       textarea.select();
//       // To copy generated caption to clipboard
//       const successful = document.execCommand('copy');

//       if (successful) {
//         setCopied(true);
//         toast.success("Caption copied to clipboard!");
//         setTimeout(() => setCopied(false), 2000);
//       } else {
//         toast.error("Failed to copy. Please copy manually.");
//       }
//     } catch (err) {
//       toast.error("Failed to copy. Please copy manually.");
//     } finally {
//       document.body.removeChild(textarea);
//     }
//   };

//   return (
//     <div className="size-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
//       <Toaster />
//       <InstallPrompt />
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//             CushiMuse
//           </h1>
//           <p className="text-gray-600">Create engaging social media content for your ministry</p>
//         </div>

//         <Card className="shadow-xl border-0">
//           <CardHeader>
//             <CardTitle>Generate Your Caption</CardTitle>
//             <CardDescription>
//               Fill the details below to create compelling caption for your church social media posts.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-5">
//             {/* Title/Prompt Field */}
//             <div className="space-y-2">
//               <Label htmlFor="title">Post Title or Prompt</Label>
//               <Input
//                 id="title"
//                 placeholder="e.g., Sunday Service at 10 AM, Youth Group Meeting, Bible Study..."
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="text-base"
//               />
//             </div>

//             {/* Post Type */}
//             <div className="space-y-2">
//               <Label htmlFor="post-type">Post Type</Label>
//               <Select value={postType} onValueChange={setPostType}>
//                 <SelectTrigger id="post-type">
//                   <SelectValue placeholder="Select post type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="announcement">Announcement</SelectItem>
//                   <SelectItem value="event">Event</SelectItem>
//                   <SelectItem value="educational">Educational/Devotional</SelectItem>
//                   <SelectItem value="promotional">Promotional</SelectItem>
//                   <SelectItem value="testimony">Testimony</SelectItem>
//                   <SelectItem value="prayer-request">Prayer Request</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Platform */}
//             <div className="space-y-2">
//               <Label htmlFor="platform">Platform</Label>
//               <Select value={platform} onValueChange={setPlatform}>
//                 <SelectTrigger id="platform">
//                   <SelectValue placeholder="Select platform" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="facebook">Facebook</SelectItem>
//                   <SelectItem value="instagram">Instagram</SelectItem>
//                   <SelectItem value="twitter">Twitter/X</SelectItem>
//                   <SelectItem value="linkedin">LinkedIn</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Tone */}
//             <div className="space-y-2">
//               <Label htmlFor="tone">Tone</Label>
//               <Select value={tone} onValueChange={setTone}>
//                 <SelectTrigger id="tone">
//                   <SelectValue placeholder="Select tone" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="inspirational">Inspirational</SelectItem>
//                   <SelectItem value="welcoming">Welcoming</SelectItem>
//                   <SelectItem value="joyful">Joyful</SelectItem>
//                   <SelectItem value="reflective">Reflective</SelectItem>
//                   <SelectItem value="educational">Educational</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Generate Button */}
//             <Button
//               onClick={handleGenerate}
//               className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
//               disabled={isLoading || !title || !postType || !platform || !tone}
//               size="lg"
//             >
//               {isLoading ? (
//                 <>
//                   <Sparkles className="mr-2 h-5 w-5 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="mr-2 h-5 w-5" />
//                   Generate Caption
//                 </>
//               )}
//             </Button>

//             {/* Generated Caption */}
//             {generatedCaption && (
//               <div className="space-y-2 pt-4 border-t">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="generated">Generated Caption</Label>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleCopy}
//                     className="gap-2"
//                   >
//                     {copied ? (
//                       <>
//                         <Check className="h-4 w-4" />
//                         Copied!
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="h-4 w-4" />
//                         Copy
//                       </>
//                     )}
//                   </Button>
//                 </div>
//                 <Textarea
//                   id="generated"
//                   value={generatedCaption}
//                   readOnly
//                   className="min-h-[200px] bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 focus:border-purple-300"
//                 />
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="text-center mt-8 text-sm text-gray-500">
//           <p>Made with love for churches and ministries</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./components/ui/card";
import { Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { InstallPrompt } from "./components/InstallPrompt";

export default function App() {
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("");
  const [platform, setPlatform] = useState("");
  const [tone, setTone] = useState("");
  const [audienceVoice, setAudienceVoice] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buildChurchPrompt = () => {
    const platformLabel =
      platform === "instagram"
        ? "Instagram"
        : platform === "facebook"
          ? "Facebook Page"
          : platform === "twitter"
            ? "Twitter/X"
            : "LinkedIn";

    const postTypeLabels: Record<string, string> = {
      announcement: "an important announcement",
      event: "an upcoming event",
      educational: "a devotional or Bible teaching",
      promotional: "an invitation to get involved",
      testimony: "a personal story of faith",
      prayerRequest: "a request for prayer support"
    };

    const toneLabels: Record<string, string> = {
      inspirational: "hopeful and uplifting",
      welcoming: "warm and inviting",
      joyful: "celebratory and energetic",
      reflective: "thoughtful and peaceful",
      educational: "clear and insightful"
    };

    const voicePresets: Record<string, string> = {
      pastor: `
Write in a pastoral voice.
Sound calm, shepherding, and spiritually grounded.
Use reverent language that inspires trust and reflection.
Avoid hype or overly casual phrasing.
      `.trim(),

      youth: `
Write in a youth church voice.
Sound energetic, encouraging, and action oriented.
Use simple, clear language that feels alive and inviting.
Avoid slang, but keep warmth and momentum.
      `.trim()
    };

    return `
You lead social media for a local church.

${voicePresets[audienceVoice] || voicePresets.pastor}

Write one short caption for ${platformLabel} about ${postTypeLabels[postType] || "a ministry update"
      } with a ${toneLabels[tone] || "positive"} tone.

Details:
- Title or topic: "${title}"
- Keep it 20 to 25 words
- Use active voice such as Join us, Come and experience, Gather with us
- For Instagram or Twitter with joyful tone, add 1 emoji (🙏✨🙌) and 1 or 2 hashtags like #FaithFamily
- Never use slang, emojis, or hashtags on Facebook or LinkedIn
- Focus on community, hope, and practical next steps, not abstract theology

Caption only. No labels, quotes, or explanations.
    `.trim();
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    const prompt = buildChurchPrompt();

    try {
      const response = await fetch("http://localhost:3001/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const responseBody = await response.text();
      console.log("Raw response:", responseBody);

      if (!response.ok) {
        let errorMessage = "Failed to generate caption";
        try {
          const errorData = JSON.parse(responseBody);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${responseBody.substring(0, 100)}`;
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseBody);
      setGeneratedCaption(data.caption);
      toast.success("Caption generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate caption. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedCaption)
      .then(() => {
        setCopied(true);
        toast.success("Caption copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy. Please copy manually.");
      });
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <Toaster />
      <InstallPrompt />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CushiMuse
          </h1>
          <p className="text-gray-600">
            Create engaging social media content for your ministry
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Generate Your Caption</CardTitle>
            <CardDescription>
              Fill the details below to create compelling captions for your
              church social media posts.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Post Title or Prompt</Label>
              <Input
                placeholder="e.g., Sunday Service at 10 AM, Youth Hangout..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Post Type</Label>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="testimony">Testimony</SelectItem>
                  <SelectItem value="prayerRequest">Prayer Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="welcoming">Welcoming</SelectItem>
                  <SelectItem value="joyful">Joyful</SelectItem>
                  <SelectItem value="reflective">Reflective</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Audience Voice</Label>
              <Select
                value={audienceVoice}
                onValueChange={setAudienceVoice}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select audience voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pastor">Pastoral Service</SelectItem>
                  <SelectItem value="youth">Youth Church</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              disabled={
                isLoading ||
                !title ||
                !postType ||
                !platform ||
                !tone ||
                !audienceVoice
              }
              size="lg"
            >
              {isLoading ? "Generating..." : "Generate Caption"}
            </Button>

            {generatedCaption && (
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Generated Caption</Label>
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Textarea
                  value={generatedCaption}
                  readOnly
                  className="min-h-[180px]"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500">
          Publishing truth with excellence
        </div>
      </div>
    </div>
  );
}
