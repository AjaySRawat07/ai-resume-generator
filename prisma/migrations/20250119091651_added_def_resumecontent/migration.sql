-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT DEFAULT 'Untitled',
    "description" TEXT,
    "photoUrl" TEXT,
    "colorHex" TEXT NOT NULL DEFAULT '#000000',
    "boarderStyle" TEXT NOT NULL DEFAULT 'squircle',
    "summary" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "city" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resume_content" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "socialData" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "projectDetails" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "experience" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "certifications" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "education" JSONB[] DEFAULT ARRAY[]::JSONB[],

    CONSTRAINT "resume_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkUserId_key" ON "users"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume_content" ADD CONSTRAINT "resume_content_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
